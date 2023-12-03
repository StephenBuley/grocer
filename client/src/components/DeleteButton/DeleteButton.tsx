import { ReactElement } from 'react'
import './DeleteButton.css'
import { Form } from 'react-router-dom'

type DeleteButtonProps = {
  id: string
}

export default function DeleteButton({ id }: DeleteButtonProps): ReactElement {
  return (
    <Form className="delete-form" method="post" action={`/destroy`}>
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
