"use client"

import { useState } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState('');
  
  
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
            src={post.creator.image} 
            alt="Profile Picture" 
            width={40} 
            height={40} 
            className='rounded-full object-contain'
          />
          <div className='flex flex-col ml-2'>
            <h3 className='font-semibold'>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
            <p className='text-sm text-gray-500'>{post.created_at}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='' onClick={()=> {}}>
            <Image 
              src={copied === post.prompt 
                ? '/assets/icons/tick.svg' 
                : '/assets/icons/copy.svg'} 
              alt="Copy Button"  
              width={12}  
              height={12} 
            />
          </div>
          <button 
            className='text-gray-500 hover:text-gray-700 ml-2'
            onClick={() => handleEdit(post)}
          >
            Edit
          </button>
          <button 
            className='text-red-500 hover:text-red-700 ml-2'
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <p className='mt-2'>{post.prompt}</p>
      <p>
        {post.tag}
      </p>
    </div>
  )
}

export default PromptCard
