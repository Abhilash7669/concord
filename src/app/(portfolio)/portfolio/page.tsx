import PrimaryText from '@/components/text/primary/primary-text';
import { client } from '@/sanity/client'
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { type SanityDocument } from 'next-sanity'
import Image from 'next/image';
import React from 'react'

type Props = object;

const DATA_QUERY = `*[_type == "hero"]`;
const options = { next: { revalidate: 30 } };

export default async function Page({}: Props) {

  const data = await client.fetch<SanityDocument[]>(DATA_QUERY, {}, options);

  const { projectId, dataset } = client.config();

  function urlFor(source: SanityImageSource) {
    if(projectId && dataset) {
      return imageUrlBuilder({ projectId, dataset }).image(source);
    } else {
      return null;
    }
  }

  const imageUrl = data[0].image ? urlFor(data[0].image)?.url() : null;

  return (
    <main className='h-screen w-full flex flex-col items-center justify-center gap-2'>
      <PrimaryText>
        {data[0].title}
      </PrimaryText>
      <div className='relative h-[20rem] w-[23rem]'>
        {imageUrl && (
          <Image 
            src={imageUrl}
            alt='image'
            className="object-cover"
            fill
            layout='fill'
          />
        )}
      </div>
      {/* testing dummy session */}
    </main>
  )
}