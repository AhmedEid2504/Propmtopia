import Feed from "@components/Feed"


export default function Home() {
  return (
    <section className="w-full flex flex-col justify-center items-center p-5">
      <h1 className="text-4xl text-center">
        Discover and share
        <br/>
        <span className="text-cyan-400">AI-Powered</span>
        <br/>
        <span className="text-cyan-400">Prompts</span>
      </h1>
      <p className="text-xl w-[80%] text-center mt-3">
        Promptopia is an open-source Ai prompting tool for modern world to discover, create and share creative prompts.
      </p>
      <Feed />
    </section>
  );
}
