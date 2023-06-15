"use client"
import { useEffect, useState, useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Auth } from '@/app/components/Auth'
import { useAuthStore } from '@/app/store';
import { Account } from '@/app/components/Account'
import { encrypt, decrypt } from "@/app/utils/encrypt";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Bip39, Random } from "@cosmjs/crypto";


export default function Home() {
  const [decryptedMnemonic, setDecryptedMnemonic] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { encryptedMnemonic, setEncryptedMnemonic } = useAuthStore()

  const doCreateAccount = async () => {
    console.log('do create', { email, password })
    if (email && password) {
      try {
        const mnemonic = Bip39.encode(Random.getBytes(16)).toString()
        const key = `${email}${password}`

        const encryptedMnemonic = await encrypt(key, mnemonic)
        setEncryptedMnemonic(encryptedMnemonic)

        const decryptedMnemonic = await decrypt(key, encryptedMnemonic)
        setDecryptedMnemonic(decryptedMnemonic)

        toast.success('Account Created Successfully')
      } catch (e) {
        console.log(e)
        toast.error('Unknown error ocurred creating account')
      }
    } else {
      toast.error('Error creating account')
    }
  };

  const doLogin = async () => {
    console.log('do login', { email, password, encryptedMnemonic })
    if (email && password && encryptedMnemonic) {
      try {
        const key = `${email}${password}`
        const decryptedMnemonic = await decrypt(key, encryptedMnemonic)
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(decryptedMnemonic)
        setDecryptedMnemonic(decryptedMnemonic)
        console.log(wallet)
      } catch (e) {
        console.log(e)
        toast.error('Unknown error ocurred logging in')
      }
    } else {
      toast.error('User not found')
    }
  }

  const doLogOut = () => {
    // TODO: implement complete removal of local storage - best way to communicate action to user?
    setDecryptedMnemonic('')
  }

  const getMnemonic = async () => {
    if (email && password && encryptedMnemonic) {
      const decryptedMnemonic = await decrypt(password, encryptedMnemonic);
      return decryptedMnemonic
    }
  }

  const isLoggedin = !!decryptedMnemonic
  console.log({ isLoggedin, decryptedMnemonic })

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <h1 className="text-3xl mb-8">Cosmos Wallet</h1>
      {!isLoggedin ?
        <Auth
          onCreate={doCreateAccount}
          onLogin={doLogin}
          onSetEmail={setEmail}
          onSetPassword={setPassword}
        /> :
        <Account
          data-testid="account"
          email={email}
          onGetMnemonic={getMnemonic}
          onLogout={doLogOut}
          decryptedMnemonic={decryptedMnemonic}
        />
      }
      <Toaster
        toastOptions={{
          duration: 4000,
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
