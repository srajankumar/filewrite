import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto min-h-dvh text-center flex gap-4 flex-col justify-center items-center px-5">
      <p className="text-3xl tracking-tight font-bold md:text-4xl">{"Something went wrong."}</p>
      <p className="text-muted-foreground">{"Please try again after some time."}</p>
      <Button asChild>
        <Link href={'/'}>Take me home</Link>
      </Button>
    </section>
  )
}
