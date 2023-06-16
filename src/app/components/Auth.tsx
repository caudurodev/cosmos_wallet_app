
import { useState } from 'react'
import { SignIn } from '@/app/components/SignIn'
import { Create } from '@/app/components/Create'
import { Recover } from '@/app/components/Recover'

type AuthProps = {
    onCreate: () => void
    onLogin: () => void
    onSetEmail: (email: string) => void
    onSetPassword: (password: string) => void
    setDecryptedMnemonic: (decryptedMnemonic: string) => void
}
export const Auth = ({
    onSetEmail,
    onSetPassword,
    onLogin,
    onCreate,
    setDecryptedMnemonic
}: AuthProps) => {
    const tabs = [
        {
            label: 'Sign In',
            component: <SignIn onLogin={onLogin} onSetEmail={onSetEmail} onSetPassword={onSetPassword} />,
            id: 'signin'
        },
        {
            label: 'Create Account',
            component: <Create onCreate={onCreate} onSetEmail={onSetEmail} onSetPassword={onSetPassword} />,
            id: 'create'
        },
        {
            label: 'Recover Account',
            component: <Recover setDecryptedMnemonic={setDecryptedMnemonic} />,
            id: 'recover'
        },
    ]
    const [authStatus, setAuthStatus] = useState(tabs[0].id)
    const activeTab = tabs.find(t => t.id === authStatus)?.component
    return (
        <>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {tabs.map((t, i) =>
                    <li className="mr-2" key={i} >
                        <button
                            data-testid={`tab-btn-${t.id}`}
                            onClick={() => setAuthStatus(t.id)}
                            className={`tab ${authStatus === t.id ? 'active' : ''}`}
                        >
                            {t.label}
                        </button>
                    </li>
                )
                }
            </ul>
            {activeTab}
        </>
    )
}