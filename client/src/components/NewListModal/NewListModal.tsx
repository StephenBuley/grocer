import React, { ReactElement } from 'react'
import { Form, redirect } from 'react-router-dom'
import './NewListModal.css'
import { IList } from '../../../../server/Schemas/ListSchema'

type ModalProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCloseModal: () => void
  listName: string
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const listName = formData.get('listName')
  console.log(listName)
  if (listName === '') {
    console.log('no name submitted')
    return
  }
  const response = await fetch('http://localhost:5002/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: listName,
    }),
  })
  const newList: IList = await response.json()
  return redirect('/')
}

export function NewListModal({
  handleSubmit,
  handleChange,
  handleCloseModal,
  listName,
}: ModalProps): ReactElement {
  return (
    <div className="modal">
      <Form className="modal__form" action="/lists/createList" method="post">
        <button
          type="button"
          onClick={() => handleCloseModal()}
          className="close-button"
        >
          X
        </button>
        <div className="modal__info">
          <label htmlFor="listName" className="modal__label">
            New List Name
          </label>
          <input
            className="modal__input"
            autoComplete="off"
            type="text"
            name="listName"
            value={listName}
            id="listName"
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <button className="modal__submit-btn" type="submit">
            Create List
          </button>
        </div>
      </Form>
    </div>
  )
}
