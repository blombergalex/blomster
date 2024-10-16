import { createClient } from "./utils/supabase/client";

export default async function Home() {
  const supabase = createClient()
  const {data, error} = await supabase.from('posts').select()
  console.log({data, error})

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start">
        <p>BLOMSTER</p>
        <p>something else</p>
      </main>
    </div>
  );
}
