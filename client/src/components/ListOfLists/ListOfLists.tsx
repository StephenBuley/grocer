import { ReactElement } from 'react'
import { IList } from '../../../../server/Schemas/ListSchema'
import DeleteButton from '../DeleteButton/DeleteButton'
type ListOfListProps = {
  lists: IList[]
  handleListClick: (id: string) => void
}

export default function ListOfLists({
  lists,
  handleListClick,
}: ListOfListProps): ReactElement {
  return (
    <div>
      {lists.map((list) => (
        <div key={list._id} className="list">
          <button onClick={() => handleListClick(list._id!)}>
            {list.name}
          </button>
          <DeleteButton id={list._id!} />
        </div>
      ))}
    </div>
  )
}
