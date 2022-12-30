import React, { ReactElement } from "react"
import "./NewListModal.css"

type ModalProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCloseModal: () => void
  listName: string
}

export function NewListModal({
  handleSubmit,
  handleChange,
  handleCloseModal,
  listName,
}: ModalProps): ReactElement {
  return (
    <div className="modal">
      <form className="modal__form" onSubmit={(e) => handleSubmit(e)}>
        <button onClick={() => handleCloseModal()} className="close-button">
          X
        </button>
        <div className="modal__info">
          <label htmlFor="list-name" className="modal__label">
            New List Name
          </label>
          <input
            className="modal__input"
            autoComplete="off"
            type="text"
            name="list-name"
            value={listName}
            id="list-name"
            onChange={(e) => handleChange(e)}
          />
          <button className="modal__submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
