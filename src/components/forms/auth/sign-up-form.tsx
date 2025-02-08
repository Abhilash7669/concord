"use client"
import { FormEvent, useState } from 'react'
import ButtonGlow from '../../ui/button/button-glow'
import hashPassword from '@/lib/hash';
import { signUpUser } from '@/lib/auth/signup';
import { useRouter } from 'next/navigation';
import { userSignUpSchema } from '@/lib/schemas/user-signup-schema';
import { ZodError } from 'zod';
import Input from '../../ui/input/input';
import FormInputContainer from '../formInputContainer';
import PrimaryText from '../../text/primary/primary-text';
import SecondaryText from '../../text/secondary/secondary-text';
import MutedText from '@/components/text/muted/muted-text';
import LinkText from '@/components/text/link/link-text';

type Props = object;

type SignUpForm = {
    name: string;
    userName: string;
    email: string;
    password: string;
}

export default function SignUpForm({}: Props) {

    const [errors, setErrors] = useState<Partial<SignUpForm>>({});
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleSignUp(e: FormEvent<HTMLFormElement>): Promise<void> {

        e.preventDefault();
        setIsLoading(() => true);


        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;  
        const userName = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string; 

        const signUpData: SignUpForm = {
            name,
            userName,
            email,
            password
        };

        try {
            userSignUpSchema.parse(signUpData);

            const hashedPassword = await hashPassword(password);

            if(hashedPassword) {
                const userExists = await signUpUser({
                    name,
                    userName,
                    email,
                    hashedPassword
                });
                if(userExists) {
                    alert("Email already in use!");
                    return;
                }
    
                router.push("/login");
            }
    

        } catch (error) {
            if(error instanceof ZodError) {
                const formattedErrors = error.errors.reduce((prev: { [key: string]: string }, curr) => {
                    // Safely cast curr.path[0] to a string, since it might be string | number
                    prev[String(curr.path[0])] = curr.message;
                    return prev;
                }, {});
                setErrors(formattedErrors); 
            }
        } finally {
            setIsLoading(() => false);
        }

    }
    

  return (
    <div className='max-w-[28rem] w-4/5 space-y-6 mx-auto'>
        <form className='w-full space-y-6' onSubmit={handleSignUp}>
            <div className='space-y-2'>
                <PrimaryText>
                    Sign up
                </PrimaryText>
                <SecondaryText>
                    Welcome to the conversation! 
                </SecondaryText>
            </div>
            <FormInputContainer>
                <Input 
                    label='Name'
                    name='name'
                    type='text'
                    placeholder='John Foo'
                    error={errors.name && errors.name}
                />
                
                <Input 
                    label='Username'
                    name='userName'
                    type='text'
                    placeholder='Enter your username...'
                    error={errors.userName && errors.userName}
                />

                <Input 
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='johnfoo@gmail.com'
                    error={errors.email && errors.email}
                />

                <Input 
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='******'
                    error={errors.password && errors.password}
                />
                <ButtonGlow
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </ButtonGlow>
            </FormInputContainer>
        </form>
        <div className='flex gap-1'>
            <MutedText>
                Already have an account?
            </MutedText>
            <LinkText href='/login'>
                Login
            </LinkText>
        </div>
    </div>
  );

}