'use client'

import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
import { useRouter } from 'next/navigation'
import CenterScreenContainer from '@/app/components/CenterScreenContainer'
import Link from 'next/link'

const Signup = () => {
  const router = useRouter()

  // States.
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  // Handle Signup.
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('creds', email, password)
    if (password !== confirmPassword) {
      window.alert('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      window.alert('Password should be at least 6 characters.')
      return
    }

    try {
      // Firebase Signup.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const token = await userCredential.user.getIdToken()
      document.cookie = `authToken=${token}; path=/; max-age=31536000` // Sets the authToken cookie 1 year. Look to implement "Remember me" or "Stay signed in".
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof Error) {
        window.alert('Failed to sign up. Please try again.')
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
      <h2 className='font-bold text-xl'>Sign up</h2>
      <form
        onSubmit={handleSignup}
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
        <div>
          <label htmlFor='confirmPassword' className='text-sm font-semibold'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Already have an account?
          <Link href='/login' className='px-2 font-semibold'>
            Login
          </Link>
        </p>
      </form>
    </CenterScreenContainer>
  )
}

export default Signup
