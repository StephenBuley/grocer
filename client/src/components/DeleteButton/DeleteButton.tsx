import { ReactElement } from 'react'
import './DeleteButton.css'
import { Form, useSubmit } from 'react-router-dom'

type DeleteButtonProps = {
  handleDelete: (id: string) => void
  id: string
}

export default function DeleteButton({
  id,
  handleDelete,
}: DeleteButtonProps): ReactElement {
  return (
    <Form
      className="delete-form"
      method="post"
      action={`/destroy`}
      onSubmit={() => handleDelete(id)}
    >
      <button
        className="delete-btn"
        name="listToDelete"
        value={id}
        type="submit"
      >
        X
      </button>
    </Form>
  )
}
