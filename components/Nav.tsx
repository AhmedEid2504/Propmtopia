"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

const Nav = () => {
    
    const { data: session } = useSession();
    const [toggleDropDown, setToggleDropDown] = useState(false);

    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className=' w-full mb-16  h-16 flex justify-between items-center text-center mt-5'>
                <Link href='/'
                    className='flex gap-2 items-center ml-3'
                >
                    <Image 
                        src="/assets/images/logo.svg"
                        alt='Promptopia Logo'
                        width={40} height={40}
                        className='object-contain'
                    />
                    <p className='max-sm:hidden'>Promptopia</p>
                </Link>
                
                <div className='sm:flex hidden'>
                    {session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/create-prompt"
                                className='bg-black text-white px-3 py-1 rounded-md border-2 border-black
                                    hover:bg-white hover:text-black transition duration-300 ease-in-out
                                '
                            >
                                Create Prompt
                            </Link>

                            <Image 
                                src={session?.user.image}
                                alt='Promptopia Logo'
                                width={40} height={40}
                                className='w-10 h-10 rounded-[50%] cursor-pointer'
                                onClick={() => setToggleDropDown((prevState) => !prevState)}
                            />
                            {toggleDropDown && (
                                <div className='absolute top-24 right-16 bg-white shadow-md rounded-md p-4 flex flex-col gap-3'>
                                    <Link href="/profile"
                                        className='block hover:text-cyan-400 transition-all duration-200 ease-in'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button type='button' onClick={()=>(
                                            signOut(),  
                                            setToggleDropDown(false)
                                        )}
                                        className='bg-black text-white px-3 py-1 rounded-md border-2 border-black hover:bg-white hover:text-black transition duration-300 ease-in-out
                                        '
                                        >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div> 

                        ) :
                        <>
                        {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                            type='button'
                            key={provider.name}
                            onClick={() => {
                                signIn(provider.id);
                            }}
                            className='black_btn'
                            >
                            Sign in
                            </button>
                        ))}
                    </>
                    }
                </div>

                <div className='sm:hidden flex justify-center gap-3'>
                    {session?.user ? (
                        <div className='flex'>
                            <Image 
                                src={session?.user.image}
                                alt='Promptopia Logo'
                                width={40} height={40}
                                className='w-10 h-10 rounded-[50%] cursor-pointer'
                                onClick={() => setToggleDropDown((prevState) => !prevState)}
                            />
                            {toggleDropDown && (
                                <div className='absolute top-20 right-6 bg-white shadow-md rounded-md p-3.5 gap-3 flex flex-col'>
                                    <Link href="/create-prompt"
                                        className='block py-2 hover:text-cyan-400 transition-all duration-200 ease-in'
                                    >
                                        Create Prompt
                                    </Link>
                                    <Link href="/profile"
                                        className='block hover:text-cyan-400 transition-all duration-200 ease-in'
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button type='button' onClick={()=>(
                                            signOut(),  
                                            setToggleDropDown(false)
                                        )}
                                        className='bg-black text-white px-3 py-1 rounded-md border-2 border-black hover:bg-white hover:text-black transition duration-300 ease-in-out
                                        '
                                        >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                type='button'
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id);
                                }}
                                className='black_btn'
                                >
                                Sign in
                                </button>
                            ))}
                        </>
                    ) 
                    }
                </div>

        </nav>
    )
}

export default Nav
