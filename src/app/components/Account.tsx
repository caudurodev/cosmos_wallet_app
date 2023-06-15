import { useState } from 'react'

type AccountProps = {
    onLogout: () => void
    onGetMnemonic: () => void
    email: string
    decryptedMnemonic: string
}
export const Account = ({ email, onLogout, decryptedMnemonic }: AccountProps) => {
    const [showMnemonic, setShowMnemonic] = useState(false)
    return (
        <>
            Hi {email} you are loggedin
            <button className="action-btn my-4" onClick={onLogout}>Logout</button>
            <button
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="action-btn my-4">
                show Mnemonic
            </button>
            {showMnemonic && <div className="my-4">{decryptedMnemonic}</div>}
        </>
    )
}