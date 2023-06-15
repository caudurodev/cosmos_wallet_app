import { useState } from 'react'

type AccountProps = {
    onLogout: () => void
}
export const Account = ({ onLogout }: AccountProps) => {
    const [email, setEmail] = useState('test@email.com')
    return (
        <>
            Hi {email} you are loggedin
            <button className="action-btn my-4" onClick={onLogout}>Logout</button>
            <button className="action-btn my-4">get Mnemonic</button>
        </>
    )
}