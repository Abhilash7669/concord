import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string
}

export default function MutedText({ children, className }: Props) {
  return (
    <p className={twMerge('font-nunito text-muted text-sm', className)}>
        {children}
    </p>
  )
}