"use client"

import { useEffect, useState } from "react";
import PrimaryText from "../text/primary/primary-text";
import SecondaryText from "../text/secondary/secondary-text";

type Props = object;

export default function DummyComponent({}: Props) {

    const [onMount, setOnMount] = useState<boolean>(false);

    useEffect(() => {

        if(!onMount) {
            setOnMount(() => true);
            return;
        }

        (async() => {

            try {
                const response = await fetch("http://localhost:4000/");
                if(response.ok) {
                    const responseData = await response.json();
                    console.log(responseData, "res");
                }
            } catch (error) {
                console.error(error);
            }

        })();

        

    }, [onMount]);  

  return (
    <section className="grid place-items-center place-content-center h-screen gap-2">
        <PrimaryText>
            Hello, World!
        </PrimaryText>
        <SecondaryText>
            This is a client component
        </SecondaryText>
    </section>
  )
}