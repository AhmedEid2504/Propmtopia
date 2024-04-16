"use client"
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {data.map((post) => (
        <PromptCard 
          key={post._id} 
          post={post} 
          handleTagClick={handleTagClick} 
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  // Fetch prompts on mount and update every minute
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {  
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }

    fetchPosts()
  }, [])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          id="search" 
          name="search" 
          placeholder="Search for a tag or a username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className='border-2 border-gray-300 shadow-md bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full'
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
