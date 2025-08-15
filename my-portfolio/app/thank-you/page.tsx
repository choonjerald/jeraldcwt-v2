export const dynamic = "force-static"

export default function ThankYouPage() {
  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Thanks!</h1>
      <p className="opacity-90">Your message has been sent. I'll get back to you soon.</p>
      <a href="/" className="inline-block mt-8 underline">Back to home</a>
    </main>
  )
}