export default function NotFound() {
  return (
    <main className="main flex h-screen flex-col items-center justify-center text-center">
      <h1 className='text-xl font-bold  md:text-2xl'>404 - Request not allowed or available</h1>
      <p className="text-medium mt-6 text-start">Consider one of the following:
        <li><a href="/auth/log-in" className="hover:underline underline-offset-2">Log in</a></li>
        <li><a href="/auth/sign-up" className="hover:underline underline-offset-2">Sign up</a></li>
        <li><a href="/" className="hover:underline underline-offset-2">Back to home</a></li>
      </p>
    </main>
  );
}
