import { twMerge } from "tailwind-merge";


type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function PrimaryText({ children, className }: Props) {
  return (
    <p 
        className={twMerge('font-montserrat font-medium text-primary text-3xl text-white', className)}
    >
        {children}
    </p>
  )
}