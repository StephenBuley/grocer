import React, { ReactElement } from "react"

type ModalProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  listName: string
}

export function NewListModal({
  handleSubmit,
  handleChange,
  listName,
}: ModalProps): ReactElement {
  return (
    <form className="modal__new-list" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="list-name">New List Name</label>
      <input
        type="text"
        name="list-name"
        value={listName}
        id="list-name"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
