import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './listOfLists.css'
import { IList } from '../../../../server/Schemas/ListSchema'
import DeleteButton from '../DeleteButton/DeleteButton'
type ListOfListProps = {
  lists: IList[]
}

export default function ListOfLists({ lists }: ListOfListProps): ReactElement {
  return (
    <div className="list-of-lists">
      {lists.map((list) => (
        <div key={list._id} className="list">
          <Link to={`/lists/${list._id}`} className="btn">
            {list.name}
          </Link>
          <DeleteButton id={list._id!} />
        </div>
      ))}
    </div>
  )
}
