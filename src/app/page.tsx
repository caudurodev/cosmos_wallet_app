"use client"
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Auth } from '@/app/components/Auth'
import { Account } from '@/app/components/Account'
import { useAuth } from '@/app/hooks/useAuth'

export default function Home() {

  const [decryptedMnemonic, setDecryptedMnemonic] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    doCreateAccount,
    doLogin,
    doLogOut,
    getMnemonic,
  } = useAuth({
    email,
    password,
    setDecryptedMnemonic,
  })

  const isLoggedin = !!decryptedMnemonic

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <h1 className="text-3xl">Cosmos Wallet</h1>
      <h3 className="text-xl mt-2 mb-8">(Client-side only)</h3>
      {!isLoggedin ?
        <Auth
          onCreate={doCreateAccount}
          onLogin={doLogin}
          onSetEmail={setEmail}
          onSetPassword={setPassword}
          setDecryptedMnemonic={setDecryptedMnemonic}
        /> :
        <Account
          email={email}
          password={password}
          onGetMnemonic={getMnemonic}
          onLogout={doLogOut}
          decryptedMnemonic={decryptedMnemonic}
        />
      }
      <Toaster
        toastOptions={{
          duration: 1000,
          position: 'bottom-center',
          success: {
            className: 'toaster-success-class',
          },
          error: {
            className: 'toaster-error-class',
          },
        }}
      />
    </main >
  )
}
