import { UploadZone } from '@/components/upload'

export default function Home() {
  return (
    <main className=" bg-black/[0.96] antialiased min-h-screen">
      <div className="container mx-auto p-4 max-h-screen max-w-md">
        <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Luxens
        </h1>
        <UploadZone />
      </div>
    </main>
  )
}
