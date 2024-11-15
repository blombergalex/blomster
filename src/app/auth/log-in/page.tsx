import Link from 'next/link'

import { LogInForm } from './form'

export default function LogInPage() {
  return (
    <main className='main flex h-screen flex-col items-center justify-center gap-6'>
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <LogInForm />
      </div>
      <div className='text-primary-500 mt-6 text-small'>
        <Link href='/auth/sign-up' className='hover:underline underline-offset-2'>
          Don&apos;t have an account? Sign up
        </Link>
        <p className='text-primary-500 text-center'>or</p>
        <div className='text-center hover:underline underline-offset-2'>
          <Link href='/'>Continue as guest</Link>
        </div>
      </div>
    </main>
  )
}
