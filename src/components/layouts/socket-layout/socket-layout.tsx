"use client"

import SocketProvider from "@/lib/context/SocketContext";
import React from "react"

type Props = {
    children: React.ReactNode;
}

export default function SocketLayout({ children }: Props) {
  return (
    <SocketProvider>
        {children}
    </SocketProvider>
  )
}