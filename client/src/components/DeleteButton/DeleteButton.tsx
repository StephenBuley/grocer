import React, {ReactElement} from "react"
import "./DeleteButton.css"

type DeleteButtonProps = {
  handleDeleteList: (id: string) => void
  id: string
}

export default function DeleteButton({
  handleDeleteList,
  id
}: DeleteButtonProps): ReactElement {
  return (
    <button onClick={() => handleDeleteList(id)}>X</button>
  )
}