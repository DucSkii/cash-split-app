'use client'

import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
import { useRouter } from 'next/navigation'
import CenterScreenContainer from '@/app/components/CenterScreenContainer'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()

  // States.
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Handle Login.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('creds', email, password)

    try {
      // Firebase login.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const token = await userCredential.user.getIdToken()
      document.cookie = `authToken=${token}; path=/; max-age=31536000` // Sets the authToken cookie 1 year. Look to implement "Remember me" or "Stay signed in".
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        window.alert('Invalid Credentials.')
        throw new Error(err.message)
      } else {
        window.alert('An error has occurred.')
        setEmail('')
        setPassword('')
      }
    }
  }

  return (
    <CenterScreenContainer className='gap-10'>
      <h2 className='font-bold text-xl'>Login</h2>
      <form
        onSubmit={handleLogin}
        className='w-full max-w-[400px] flex flex-col gap-5'
      >
        <div>
          <label htmlFor='email' className='text-sm font-semibold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 mt-1 border rounded'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='text-sm font-semibold'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 mt-1 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 rounded mt-4 bg-gray-800 text-white'
        >
          Submit
        </button>
        <p>
          Don't have an account?
          <Link href='/signup' className='px-2 font-semibold'>
            Sign up
          </Link>
        </p>
      </form>
    </CenterScreenContainer>
  )
}

export default Login
