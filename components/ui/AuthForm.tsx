'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'




const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setSsLoading] = useState(false)
    const formSchema = authformSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const  onSubmit =async (data: z.infer<typeof formSchema>)  =>{
        setSsLoading(true)
        try {   
        
            if(type=== 'sign-up') {
                const newUser = await signUp(data);
                setUser(newUser)
            }
            if(type=== 'sign-in') {
                const response = await signIn({
                    email:data.email,
                    password:data.password,
                })
                console.log(response);
                
                if(response)  router.push('/')
            }


        } catch (error) {
            console.log(error);
            
        }
        finally {
            setSsLoading(false)
        }
    }

    return (
        <section className=' auth-form'>
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href='/'
                    className=' flex cursor-pointer items-center gap-1 '
                >
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='logo'
                    />
                    <h1 className=' text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className=' text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user ? 'Link your acount to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/** PlaidLink*/}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                <div className=' flex gap-4'>
                                    <CustomInput
                                        control={form.control} name="firstName" 
                                        placeholder='Enter your first name' label="First Name" type="text"
                                    />

                                    <CustomInput control={form.control} name="lastName"
                                        placeholder='Enter your last name' label="Last Name" type="text"
                                    />
                                </div>
                                    <CustomInput control={form.control} name="address1"
                                        placeholder='Enter your specific address' label="Address" type="text"
                                    />
                                     <CustomInput control={form.control} name="city"
                                        placeholder='Enter your city' label="City" type="text"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name="state"
                                            placeholder='Example: NY' label="State" type="text"
                                        />
                                        <CustomInput control={form.control} name="postalCode"
                                            placeholder='Example: 11101' label="Postal Code" type="text"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name="dateOfBirth"
                                            placeholder='Example: YYYY-MM-DD' label="Date of Birth" type="text"
                                        />
                                        <CustomInput control={form.control} name="ssn"
                                            placeholder='Example: 1234' label="SSN" type="text"
                                        />
                                    </div>
                                </>
                            )}
                            <CustomInput
                                control={form.control}
                                name="email"
                                placeholder='Enter your email'
                                label="Email"
                                type="email"
                            />
                            <CustomInput
                                control={form.control}
                                name="password"
                                placeholder='Enter your password'
                                label="Passord"
                                type='password'
                            />
                            <div className="flex flex-col gap-4">

                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {
                                        isLoading ? (
                                            <>
                                            <Loader2 
                                                size={20}
                                                className=' animate-spin'
                                            /> &nbsp;
                                            Loading...
                                            </>
                                        ) : type=== 'sign-in' ? 'SIGN IN': 'SIGN UP'
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className=' text-14 font-normal text-gray-600'>{type==='sign-in' ? "Don't have an account?" : "Already have an account?"}</p>
                        <Link href={type==='sign-in' ? 'sign-up': 'sign-in'} className='form-link'>
                            {type==='sign-in' ? 'Sign-up': 'Sign-in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm