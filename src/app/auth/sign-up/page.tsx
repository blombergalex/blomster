import Link from 'next/link'

import { SignUpForm } from './form'

export default function LogInPage() {
  return (
    <main className='main mt-[20vh] flex grow flex-col items-center'>
      <div className='flex w-full grow flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>Welcome to Blomster</h1>
        <SignUpForm />
      </div>
      <Link href='/auth/log-in' className='text-primary-500'>
        Already have an account? Log in
      </Link>
    </main>
  )
}
