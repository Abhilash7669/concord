"use client"
import { 
    createContext, 
    JSX, 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { 
    io, 
    ManagerOptions, 
    Socket, 
    SocketOptions 
} from "socket.io-client";

type SocketProviderProps = {
    children: React.ReactNode;
}

type SocketContextType = {
    socket: Socket | null
}

const SocketContext = createContext<SocketContextType | null>(null);

export function useSocket() {

    const ctx = useContext(SocketContext);

    if(!ctx) throw new Error("Can only be used under <SocketProvider>");

    return ctx;

}

export default function SocketProvider({ children }: SocketProviderProps): JSX.Element {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [onMount, setOnMount] = useState<boolean>(false);

    function hasMounted(): void {
        setOnMount(() => true);
        return;
    }

    useEffect(() => {

        if(onMount) hasMounted();
        
        if(!socket) {
            
            const socketOptions: Partial<ManagerOptions & SocketOptions> = {
                transports: ["websocket"],
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 5000
            }

            const socketInstance = io(process.env.BACKEND_PORT || "http://localhost:4000/", socketOptions);

            setSocket(() => socketInstance);
        }   

        return () => {
            setSocket(() => null);
        }

    }, [onMount]);

    const contextValues = {
        socket
    };

    return (
        <SocketContext.Provider value={contextValues}>
            {children}
        </SocketContext.Provider>
    )
    
}