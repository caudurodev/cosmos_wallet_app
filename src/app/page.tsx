"use client"
import { useState } from 'react'
import { Auth } from '@/app/components/Auth'

import { Account } from '@/app/components/Account'

export default function Home() {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const doLogOut = () => {
    // TODO: Add log out logic here
    setIsLoggedin(false)
  }
  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <h1 className="text-3xl mb-8">Cosmos Wallet</h1>

      {/* TODO: remove this button  - for testing only */}
      <button className="action-btn m-12" onClick={() => setIsLoggedin(!isLoggedin)}>
        toggle is Logged in
      </button>

      {!isLoggedin ? <Auth isLoggedin={isLoggedin} /> : <Account onLogout={doLogOut} />}
    </main >
  )
}
