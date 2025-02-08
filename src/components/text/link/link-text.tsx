import Link from 'next/link';
import React from 'react'
import SecondaryText from '@/components/text/secondary/secondary-text';

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function LinkText({ href = "/", children = "Link text here", className = "" }: Props) {
  return (
    <Link href={href} className='group'>
        <SecondaryText 
            className={`
                text-accent-blue transition duration-150
                group-hover:opacity-55 group-active:scale-95
                w-fit ${className}
            `}
        >
            {children}
        </SecondaryText>
    </Link>
  )
}