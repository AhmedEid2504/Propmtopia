"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    return (
        <nav className=' w-full mb-16  h-16 flex justify-between items-center text-center'>
                <Link href='/'
                    className='flex gap-2 items-center ml-3'
                >
                    <Image 
                        src="/assets/images/logo.svg"
                        alt='Promptopia Logo'
                        width={40} height={40}
                        className='object-contain'
                    />
                </Link>

        </nav>
    )
}

export default Nav
