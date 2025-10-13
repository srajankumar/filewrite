import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
        <div className="mx-auto min-h-dvh text-center flex gap-4 flex-col justify-center items-center px-5">
                <h1 className="text-5xl tracking-tight font-bold lg:text-6xl">404</h1>
                <p className="text-3xl tracking-tight font-bold md:text-4xl">{"Something's missing."}</p>
                <p className="text-muted-foreground">{"Sorry, we can't find that page. You'll find lots to explore on the home page."}</p>
                <Button asChild>
                    <Link href={'/'}>Take me home</Link>
                </Button>
            </div>
    </section>
  )
}
