import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
}

export default function SecondaryText({ children, className }: Props) {
  return (
    <p className={twMerge('font-nunito text-secondary text-sm', className)}>
        {children}
    </p>
  )
}