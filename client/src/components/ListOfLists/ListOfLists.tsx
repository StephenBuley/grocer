import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './listOfLists.css'
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
    <div className="list-of-lists">
      {lists.map((list) => (
        <div key={list._id} className="list">
          <Link
            to={`/lists/${list._id}`}
            onClick={() => handleListClick(list._id!)}
          >
            {list.name}
          </Link>
          <DeleteButton id={list._id!} />
        </div>
      ))}
    </div>
  )
}
