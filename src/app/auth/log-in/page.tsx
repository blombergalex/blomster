import Link from 'next/link'

import { LogInForm } from './form'

export default function LogInPage() {
  return (
    <main className='main mt-[20vh]  flex h-full flex-col items-center gap-6'>
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold mt-6 md:mt-12'>Welcome back</h1>
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
