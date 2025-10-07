import { FolderOpen, Paperclip, SquareMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const LoginOptions = () => {
    const features = [
    {
      title: "File Sharing",
      link: "/file-sharing",
      icon: <FolderOpen />
    },
    {
      title: "URL Shortener",
      link: "/url-shortener",
      icon: <Paperclip />
    },
    {
      title: "Collab. Textbox",
      link: "/textbox",
      icon: <SquareMousePointer />
    },
  ]

  return (
     <div className='grid md:grid-cols-3 grid-cols-2 gap-6 text-center pb-5'>
      {features.map((feature, index) => (
        <Link href={feature.link} key={index} className='grid group gap-2'>
          <div className='text-primary mx-auto p-2 border-2 border-transparent transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-sm rounded-md group-hover:bg-primary/10 w-fit h-fit'>
            {feature.icon}
          </div>
          <h2 className='font-semibold'>{feature.title}</h2>
        </Link>
      ))}
    </div>
  )
}

export default LoginOptions