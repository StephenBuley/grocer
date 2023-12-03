import { Params, useLoaderData } from 'react-router-dom'

export async function loader({ params }: { params: Params<string> }) {
  const id = params.listId
  return id
}

export default function List({ title }: { title: string }) {
  const id = useLoaderData() as string
  return <h2>{id}</h2>
}
