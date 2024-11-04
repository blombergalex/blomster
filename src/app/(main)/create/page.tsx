export default function createPage() {
  return (
    <main className="w-full px-2 flex flex-col mt-4 flex-grow items-center">
      <p className="text-tiny text-foreground uppercase font-bold px-2">
        create post
      </p>
    </main>
  )
}

// this should be a protected route, fixed in middleware!