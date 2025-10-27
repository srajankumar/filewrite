import React from 'react'
import Header from '@/components/header'
import FileUploader from '@/components/file-uploader'

const FileSharing = () => {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
        <Header/>
        <FileUploader/>
    </main>
  )
}

export default FileSharing