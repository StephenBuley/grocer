import { ReactElement } from "react";

type ModalProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function NewListModal({handleSubmit}: ModalProps): ReactElement {

    return (
        <form className="modal__new-list" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="list-name">New List Name</label>
            <input type="text" name="list-name" id="list-name" />
            <button type="submit">Submit</button>
        </form>
    )
}
