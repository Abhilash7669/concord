import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | null;
}

const Input = React.forwardRef(
    function Input(
        { label, error, ...props }: Props, 
        ref: React.ForwardedRef<HTMLInputElement>
    ) {
        return(
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col space-y-1'>
                    <label className='font-nunito text-base text-muted'>
                        {label}      
                    </label>
                    <input 
                        className={
                            `rounded-md ${error && ('!border-red-500')} text-white
                            border-[2px] border-muted ring-0 outline-none focus-visible:ring-0 focus:outline-none focus-visible:outline-none focus:border-accent-blue
                            py-1 px-2 transition-all placeholder:text-muted bg-[#2B2B2B]`
                        }
                        ref={ref}
                        {...props} 
                    />
                </div>
                {error && (
                    <p className='text-red-500 font-nunito text-sm'>
                        {error}
                    </p>
                )}
            </div>
        )
    }
);


export default Input;