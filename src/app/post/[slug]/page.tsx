import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { notFound } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/client'

export default async function PostPage({ params }:{ params: { slug: string }}) {
  const supabase = createClient()
  const {data, error} = await supabase
    .from('posts')
    .select('title, content, users("username"), timestampz') //varför blir det error när jag försöker komma åt timestampz?
    .eq('slug', params.slug)
    .single()

    if (!data || error) notFound()

      console.log(data)
  return (
    <Card className="py-4 border-2 border-white">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold">{data.users?.username}</p>
      {/* <small className="text-default-500">{data.timestampz}</small> // fix timestamp */}
      <h4 className="font-bold text-large">{data.title}</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        src="https://nextui.org/images/hero-card-complete.jpeg" // fix actual imagesrc
        width={270}
      />
      <p>{data.content}</p>
      <p>{data.timestampz}</p>
    </CardBody>
  </Card>
  )
}
