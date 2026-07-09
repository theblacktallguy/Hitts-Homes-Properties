export default function PropertyLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-[calc(env(safe-area-inset-top)+56px)] md:px-6">
        <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-3xl bg-white px-6 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0B1F3A] shadow-xl">
            <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>

          <h1 className="mt-8 text-2xl font-bold text-[#0B1F3A] md:text-4xl">
            Opening property details
          </h1>

          <div className="mt-5 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce" />
            <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:150ms]" />
            <span className="h-3 w-3 rounded-full bg-[#C8A45D] animate-bounce [animation-delay:300ms]" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
          <div className="h-80 rounded-3xl bg-white shadow-sm">
            <div className="h-full rounded-3xl bg-gray-100" />
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <div className="h-6 w-3/4 rounded-full bg-gray-100" />
            <div className="h-4 w-1/2 rounded-full bg-gray-100" />
            <div className="h-4 w-2/3 rounded-full bg-gray-100" />
            <div className="h-12 w-full rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
