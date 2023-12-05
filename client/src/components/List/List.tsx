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
  for (const [itemId, checked] of formData.entries()) {
    const newChecked = checked === 'true' ? true : false
    const response = await fetch(
      `http://localhost:5002/lists/${params.listId}/${itemId}`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checked: !newChecked, // make it the opposite of what it is now
        }),
      },
    )
    return await response.json()
  }
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
          let checked = item.checked
          console.log(checked)
          if (fetcher.formData) {
            checked = fetcher.formData.get(item._id.toString()) === 'true'
          }
          return (
            <fetcher.Form method="put" key={item._id.toString()}>
              <label htmlFor={item.name}>
                <button
                  id={item.name}
                  className={`checkmark ${checked ? 'checked' : ''}`}
                  name={item._id.toString()}
                  value={String(checked)}
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
