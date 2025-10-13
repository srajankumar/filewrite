import { FolderOpen, Paperclip, SquareMousePointer } from 'lucide-react'
import React from 'react'

const Feature = () => {
  const features = [
    {
      title: "File Sharing",
      description: "Share files instatntly.",
      icon: <FolderOpen />
    },
    {
      title: "URL Shortener",
      description: "Turn long links into short.",
      icon: <Paperclip />
    },
    {
      title: "Collaborative Textbox",
      description: "Write together instantly.",
      icon: <SquareMousePointer/>
    },
  ]
  
  return (
    <section className='md:py-20 py-16 grid md:grid-cols-3 grid-cols-2 gap-6'>
      {features.map((feature, index) => (
        <div key={index} className='grid gap-2'>
          <div className='text-primary p-2 border-2 border-primary/30 shadow-sm rounded-md bg-primary/10 w-fit h-fit'>
            {feature.icon}
          </div>
          <div>
            <h2 className='font-semibold'>{feature.title}</h2>
            <p className='text-sm text-muted-foreground'>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Feature