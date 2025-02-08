"use client"

import FormInputContainer from '@/components/forms/formInputContainer';
import LinkText from '@/components/text/link/link-text';
import MutedText from '@/components/text/muted/muted-text';
import PrimaryText from '@/components/text/primary/primary-text';
import SecondaryText from '@/components/text/secondary/secondary-text';
import ButtonGlow from '@/components/ui/button/button-glow';
import Input from '@/components/ui/input/input';
import loginUser from '@/lib/auth/login';
import { userLoginSchema } from '@/lib/schemas/user-login-schema';
import { TLoginForm, TLoginResponse } from '@/lib/types/auth/login/login-type';

import { 
  FormEvent, 
  useState 
} from 'react'
import { ZodError } from 'zod';

type Props = object;

export default function LoginForm({}: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<Partial<TLoginForm>>({});

    async function handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {

        setIsLoading(prevState => !prevState);
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        let authResult: TLoginResponse;

        const loginData: TLoginForm = {
            email,
            password
        }
        
        try {
            userLoginSchema.parse(loginData);
            
            authResult = await loginUser(loginData);

            if(!authResult.success) setError(() => authResult.message);


        } catch (err) {
            if(err instanceof ZodError) {
                const formattedErrors = err.errors.reduce((prev: { [key: string]: string}, curr) => {
                    prev[String(curr.path[0])] = curr.message;
                    return prev;
                }, {});
                console.log(formattedErrors)
                setFieldError(() => formattedErrors); 
            }
            
        } finally {
            setIsLoading(() => false);
        }


    }

  return (
    <div className='max-w-[28rem] w-4/5 space-y-6'>
        <form className='w-full space-y-6' onSubmit={handleLogin}>
            <div className='space-y-2'>
                <PrimaryText>
                    Login
                </PrimaryText>
                <SecondaryText>
                    Welcome to the conversation! 
                </SecondaryText>
            </div>
            <FormInputContainer>
            <Input 
                label='Email'
                name='email'
                type='email'
                placeholder='johnfoo@gmail.com'
                error={fieldError.email && fieldError.email}
            />
            <Input 
                label='Password'
                name='password'
                type='password'
                placeholder='******'
                error={fieldError.password && fieldError.password}
            />
            <ButtonGlow
                type='submit'
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </ButtonGlow>
            {error && (
                <p className='text-red-500 font-nunito text-sm'>
                {error}
                </p>
            )}
            </FormInputContainer>
        </form>
        <div>
            <div className='flex gap-1'>
                <MutedText>
                    Don&apos;t have an account?
                </MutedText>
                <LinkText href='/sign-up'>
                    Register now
                </LinkText>
            </div>
            <LinkText href='/'>
                Forgot Password ?
            </LinkText>
        </div>
    </div>
  )
}