import Link from 'next/link'

import { LogInForm } from './form'

export default function LogInPage() {
  return (
    <main className='main flex h-fullflex-col items-center'>
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <LogInForm />
      </div>
      <div className='text-primary-500 mt-6'>
        <Link href='/auth/sign-up'>
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </main>
  )
}
