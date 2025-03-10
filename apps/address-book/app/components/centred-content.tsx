export function CentredContent({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-lg bg-white px-24 py-8 shadow-lg">
        <h1 className="mb-16 text-center text-4xl font-semibold text-gray-700">
          {title}
        </h1>
        <div>{children}</div>
      </div>
    </div>
  )
}
