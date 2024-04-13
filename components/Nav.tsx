"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

const Nav = () => {
    const isUserLoggedIn = true;
    const [ toggleDropDown, setToggleDropDown ] = useState(false);

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            setProviders(providers);
        }
        fetchProviders();
    }, [])
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
                    <p className='max-sm:hidden'>Promptopia</p>
                </Link>
                <div className='sm:flex hidden'>
                    {isUserLoggedIn ? 
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/create-prompt"
                                className='bg-black text-white px-3 py-1 rounded-md border-2 border-black
                                    hover:bg-white hover:text-black transition duration-300 ease-in-out
                                '
                            >
                                Create Prompt
                            </Link>
                            <Image 
                                src="/assets/images/profile-image.jpg"
                                alt='Promptopia Logo'
                                width={40} height={40}
                                className='w-10 h-10 rounded-[50%] cursor-pointer'
                                onClick={() => setToggleDropDown((prevState) => !prevState)}
                            />
                            {toggleDropDown && (
                                <div className='absolute top-16 right-16 bg-white shadow-md rounded-md p-3 flex flex-col'>
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
                                        className='block py-2 hover:text-cyan-400 transition-all duration-200 ease-in'
                                        >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div> 
                        :
                        <>
                            {providers && 
                                Object.values(providers).map((provider) => (
                                    <button type='button' 
                                            key={provider.name} 
                                            onClick={() => signIn(provider.id)}
                                            className='bg-transparent text-black px-3 py-1 rounded-md border-2 border-black
                                            hover:bg-black hover:text-white transition duration-300 ease-in-out'
                                    >Sign In</button>
                                ))}
                        </>
                    }
                </div>

                <div className='sm:hidden flex justify-center gap-3'>
                    {isUserLoggedIn ? (
                        <div className='flex'>
                            <button type='button' 
                                className='bg-black text-white px-3 py-1 rounded-md border-2 border-black
                                    hover:bg-white hover:text-black transition duration-300 ease-in-out'
                                onClick={() => setToggleDropDown((prevState) => !prevState)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                            {toggleDropDown && (
                                <div className='absolute top-16 right-6 bg-white shadow-md rounded-md p-3 flex flex-col'>
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
                                        className='block py-2 hover:text-cyan-400 transition-all duration-200 ease-in'
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
                                    <button type='button' 
                                            key={provider.name} 
                                            onClick={() => signIn(provider.id)}
                                            className='bg-transparent text-black px-3 py-1 rounded-md border-2 border-black
                                            hover:bg-black hover:text-white transition duration-300 ease-in-out'
                                    >Sign In</button>
                                ))}
                        </>
                    ) 
                    }
                </div>

        </nav>
    )
}

export default Nav
