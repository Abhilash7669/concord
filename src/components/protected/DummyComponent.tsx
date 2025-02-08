"use client"

import { useEffect, useState } from "react";
import PrimaryText from "../text/primary/primary-text";
import SecondaryText from "../text/secondary/secondary-text";
import { useSocket } from "@/lib/context/SocketContext";

type Props = object;

export default function DummyComponent({}: Props) {

    const { socket } = useSocket();
    const [socketMessage, setSocketMessage] = useState<string | null>(null);

    useEffect(() => {

        if(socket) {
            socket.on("connect", socketConnect);
            socket.on("hello", setSocketEmitValue);
        }

        return () => {
            socket?.off("connect", socketConnect);
            socket?.off("hello", setSocketEmitValue);
        }

    }, [socket]);

    function socketConnect(): void {
        console.log("Socket connected");
    }

    function setSocketEmitValue(arg: string): void {
        setSocketMessage(() => arg);
    }

  return (
    <section className="grid place-items-center place-content-center h-screen gap-2">
        <PrimaryText>
            Render Socket Message
        </PrimaryText>
        <SecondaryText>
            {socketMessage ? socketMessage : "No socket message "}
        </SecondaryText>
    </section>
  )
}