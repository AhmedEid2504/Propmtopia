import Link from "next/link";


const Form = ({type, post, submitting, setPost, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-4xl">
        <span className="">{type} Post </span>
      </h1>
      <p className="max-w-md text-lg p-3">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form 
        className="flex flex-col w-full max-w-2xl gap-4 mt-4 justify-center"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          <span className="text-lg text-gray-700 py-3">Your AI Prompt</span>
          <textarea
            className="p-3 border border-gray-300 rounded-md"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your prompt here"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-lg text-gray-700 py-3">Tag
            <span className=" text-xs px-3 text-gray-400">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            className="p-3 border border-gray-300 rounded-md"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="#tag"
          />
        </label>
        
        <div className="flex flex-center justify-between items-center gap-7">
          <Link href='/' className="text-white text-md bg-black p-3 border-2 border-black hover:bg-transparent hover:text-black transition-all duration-200 ease-in rounded-md">
            Cancel
          </Link>
          <button
            className="p-3 bg-blue-500 text-white border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-200 ease-in rounded-md"
            disabled={submitting}
            type="submit"

          >
            {submitting ? `${type}...` : type}
          </button>
          
        </div>
      </form>
        
    </section>
  )
}

export default Form
