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
    console.log(itemId, checked)
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
        <fetcher.Form method="put" className="fetcher-form">
          {items.map((item) => {
            let checked = item.checked
            if (fetcher.formData?.get(item._id.toString())) {
              checked = fetcher.formData.get(item._id.toString()) === 'false'
            }
            return (
              <div className="btn-container" key={item._id.toString()}>
                <label
                  className="checkmark-label"
                  htmlFor={item._id.toString()}
                >
                  <button
                    id={item._id.toString()}
                    className={`checkmark ${checked ? 'checked' : ''} btn`}
                    name={item._id.toString()}
                    value={String(checked)}
                  />
                  {item.name}
                </label>
              </div>
            )
          })}
        </fetcher.Form>
      ) : (
        <div>No Items Found</div>
      )}

      <Form action={`/lists/${fetchedList._id}/createItem`} method="post">
        <button className="btn">New Item</button>
      </Form>
    </div>
  )
}
