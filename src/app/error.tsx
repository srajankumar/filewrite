"use client"

const Error = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center flex-col gap-2 p-5">
        <h1 className="text-lg">Something went wrong!</h1>
        <p className="text-muted-foreground text-sm">Please try again after some time.</p>
    </div>
  )
}

export default Error