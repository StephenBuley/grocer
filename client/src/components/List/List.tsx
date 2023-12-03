import {
  Params,
  useFetcher,
  useLoaderData,
  Form,
  redirect,
} from 'react-router-dom'
import { IList } from '../../../../server/Schemas/ListSchema'
import './List.css'

export async function loader({ params }: { params: Params<string> }) {
  const response = await fetch(`http://localhost:5002/lists/${params.listId}`)
  const fetchedList: IList = await response.json()
  return fetchedList
}

export async function newItemAction({ params }: { params: Params<string> }) {
  const response = await fetch(`http://localhost:5002/lists/${params.listId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newItem: {
        name: 'new item',
        checked: false,
      },
    }),
  })
  await response.json()
  return redirect(`/lists/${params.listId}`)
}

export async function checkAction({
  request,
  params,
}: {
  request: Request
  params: Params<string>
}) {
  const formData = await request.formData()
  const newChecked = formData.get(params.itemId!) === 'true'
  return fetch(
    `http://localhost:5002/lists/${params.listId}/${params.itemId}`,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checked: !newChecked, // true when button is unchecked
      }),
    },
  )
}

export default function List() {
  const fetcher = useFetcher()
  const fetchedList = useLoaderData() as IList
  const { items } = fetchedList

  return (
    <div className="grocery-list">
      <h2 className="list-title">{fetchedList.name}</h2>

      {items && items.length ? (
        items.map((item) => {
          return (
            <fetcher.Form
              method="put"
              action={`/lists/${fetchedList._id}/${item._id}`}
              key={item._id.toString()}
            >
              <label htmlFor={item.name}>
                <button
                  className={`checkmark ${item.checked ? 'checked' : ''}`}
                  name={item._id.toString()}
                  value={String(item.checked)}
                />
                {item.name}
              </label>
            </fetcher.Form>
          )
        })
      ) : (
        <div>No Items Found</div>
      )}

      <Form action={`/lists/${fetchedList._id}/createItem`} method="post">
        <button className="btn">New Item</button>
      </Form>
    </div>
  )
}
