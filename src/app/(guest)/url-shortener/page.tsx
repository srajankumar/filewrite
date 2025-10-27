import React from 'react'
import Header from '@/components/header'
import UrlShortener from '@/components/url-shortener'

const ShortUrl = () => {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
        <Header/>
        <UrlShortener/>
    </main>
  )
}

export default ShortUrl