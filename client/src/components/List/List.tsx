import { Params, useLoaderData } from 'react-router-dom'
import { IList } from '../../../../server/Schemas/ListSchema'

export async function loader({ params }: { params: Params<string> }) {
  const response = await fetch(`http://localhost:5002/lists/${params.listId}`)
  const fetchedList: IList = await response.json()
  return fetchedList
}

export default function List() {
  const fetchedList = useLoaderData() as IList
  return <h2>{fetchedList.name}</h2>
}
