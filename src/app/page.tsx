import CenterScreenContainer from './components/CenterScreenContainer'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <CenterScreenContainer className='gap-5'>
      <h1>Welcome to the Next.Js Cash Split App</h1>
      <p className='mb-20'>
        <Link href='/login' className='mx-2 font-semibold'>
          Login
        </Link>
        or
        <Link href='/signup' className='mx-2 font-semibold'>
          signup
        </Link>
        to continue.
      </p>
    </CenterScreenContainer>
  )
}
