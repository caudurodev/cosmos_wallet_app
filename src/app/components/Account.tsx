import { useEffect, useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

type AccountProps = {
    onLogout: () => void
    onGetMnemonic: () => void
    email: string
    password: string
    decryptedMnemonic: string
}
export const Account = ({ email, password, onLogout, decryptedMnemonic }: AccountProps) => {
    const [showMnemonic, setShowMnemonic] = useState(false)
    const [wallet, setWallet] = useState<any>(null)
    const { getWallet } = useAuth({
        email,
        password,
    })
    useEffect(() => {
        const getWalletData = async () => {
            setWallet(await getWallet(decryptedMnemonic))
        }
        if (decryptedMnemonic) {
            getWalletData()
        }
    }, [decryptedMnemonic, getWallet])

    return (
        <>
            <h3 data-testid="user-greeting">Hi {email} you are now logged in</h3>
            <button
                className="action-btn my-4"
                onClick={onLogout}
                data-testid="user-logout-btn"
            >
                Logout
            </button>
            {wallet &&
                <div data-testid="user-wallet" className="my-4">
                    <h3>Wallet info</h3>
                    {
                        wallet.accounts.map((account, i) =>
                            <div key={i}>Prefix: {account.prefix}</div>
                        )}
                </div>
            }
            <button
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="action-btn my-4"
                data-testid="user-toggle-mnemonic-btn"
            >
                {showMnemonic ? 'Hide' : 'Show'} Mnemonic
            </button>
            {showMnemonic &&
                <div data-testid="user-mnemonic" className="my-4">
                    {decryptedMnemonic}
                </div>
            }
        </>
    )
}