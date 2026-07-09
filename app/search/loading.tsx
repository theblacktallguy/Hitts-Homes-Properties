export default function SearchLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 pt-[calc(env(safe-area-inset-top)+48px)] text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0B1F3A] shadow-xl">
          <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        </div>

        <h1 className="mt-8 text-2xl font-bold text-[#0B1F3A] md:text-4xl">
          Finding you a home
        </h1>

        <div className="mt-5 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce" />
          <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:150ms]" />
          <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:300ms]" />
        </div>

        <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="h-32 rounded-t-2xl bg-gray-100" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded-full bg-gray-100" />
                <div className="h-3 w-1/2 rounded-full bg-gray-100" />
                <div className="h-3 w-2/3 rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
