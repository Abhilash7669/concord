import PrimaryText from '@/components/text/primary/primary-text';
import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'
import React from 'react'

type Props = object;

const DATA_QUERY = `*[_type == "landing-page" && slug.current == "landing-page-v1"]`;

export default async function page({}: Props) {

    const data = await client.fetch<SanityDocument[]>(DATA_QUERY, {}, {next: {revalidate: 30}});
    console.log(data, "DATA");

  return (
    <section className='h-screen grid place-items-center bg-[#F7F4F3]'>
      <PrimaryText className='text-[#2C1E23]'>
        Hello there
      </PrimaryText>
    </section>
  )
}