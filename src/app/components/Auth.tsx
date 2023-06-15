
import { useState } from 'react'
import { SignIn } from '@/app/components/SignIn'
import { Create } from '@/app/components/Create'
import { Recover } from '@/app/components/Recover'

const tabs = [
    { label: 'Sign In', component: <SignIn />, id: 'signin' },
    { label: 'Create', component: <Create />, id: 'create' },
    { label: 'Recover', component: <Recover />, id: 'recover' },
]

type AuthProps = {
    isLoggedin: boolean
}
export const Auth = ({ isLoggedin }: AuthProps) => {
    const [authStatus, setAuthStatus] = useState(tabs[0].id)
    const activeTab = tabs.find(t => t.id === authStatus)?.component
    return (
        <>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {tabs.map((t, i) =>
                    <li className="mr-2" key={i}>
                        <button
                            onClick={() => setAuthStatus(t.id)}
                            className={`tab ${authStatus === t.id ? 'active' : ''}`}
                        >
                            {t.label}
                        </button>
                    </li>
                )
                }
            </ul >
            {activeTab}
        </>
    )
}