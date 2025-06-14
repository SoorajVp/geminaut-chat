import React from 'react'

const Conversation = ({ chat, loading, prompt }) => {
  return (
    <div className="space-y-2 mt-2 text-xs md:text-sm lg:text-base" >
      <div className="flex justify-end">
        <div className="bg-neutral-600 dark:bg-neutral-300 shadow-md text-white dark:text-black py-2 px-4 rounded-t-lg rounded-l-lg max-w-md">
          {chat.user}
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-neutral-200 dark:bg-neutral-700 dark:text-white shadow-md text-black py-2 px-4 md:mr-10 rounded-t-lg rounded-r-lg max-w-screen-lg ">
          <div className='prose prose-neutral max-w-none' dangerouslySetInnerHTML={{ __html: chat.gemini }} />
        </div>
      </div>

      {
        loading &&
        <>
          <div className="flex justify-end">
            <div className="bg-neutral-600 dark:bg-neutral-300 shadow-md text-white dark:text-black py-2 px-4 rounded-t-lg rounded-l-lg max-w-md">
              {prompt}
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="pl-4 pr-8 py-2 bg-neutral-200 dark:bg-neutral-700 animate-pulse dark:text-white shadow-md text-black rounded-t-lg rounded-r-lg max-w-screen-md">
              Generating...
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Conversation