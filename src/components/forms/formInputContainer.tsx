
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    children: React.ReactNode;
    className?: string;
}

export default function FormInputContainer({ children, className }: Props) {
  return (
    <div className={twMerge('flex flex-col gap-6 w-full', className)}>
        {children}
    </div>
  )
}