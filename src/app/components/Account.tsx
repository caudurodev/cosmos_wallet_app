import { useEffect, useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { SigningStargateClient, makeCosmoshubPath } from "@cosmjs/stargate";



type AccountProps = {
    onLogout: () => void
    onGetMnemonic: () => void
    email: string
    password: string
    decryptedMnemonic: string
}
export const Account = (
    { email, password, onLogout, decryptedMnemonic }: AccountProps
) => {
    const [showMnemonic, setShowMnemonic] = useState(false)
    const [address, setAddress] = useState('');
    const { getWallet } = useAuth({ email, password })

    useEffect(() => {
        const getWalletData = async () => {
            const wallet = await getWallet(decryptedMnemonic)
            if (!wallet) return
            const accounts = await wallet.getAccounts()
            if (accounts.length > 0) {
                const account = accounts[0];
                setAddress(account.address)
            }
        }
        if (decryptedMnemonic) getWalletData()
    }, [decryptedMnemonic, getWallet])

    return (
        <div className="text-left">
            <div className="flex flex-col">
                <h3 data-testid="user-greeting">
                    Hi {email} you are now logged in.
                </h3>
                <button
                    className="action-btn my-4 inline"
                    onClick={onLogout}
                    data-testid="user-logout-btn"
                >
                    Logout
                </button>
            </div>
            {address &&
                <div data-testid="user-wallet" className="my-4">
                    <h3 className="text-2xl">Wallet info</h3>
                    <h4 className="text-bold my-2">Address</h4>
                    <input data-testid="user-address" value={address} readOnly />
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
                <textarea
                    data-testid="user-mnemonic"
                    readOnly
                    defaultValue={decryptedMnemonic}
                    className="text-xl my-4 w-[270px] min-h-[200px]"
                />
            }
        </div>
    )
}