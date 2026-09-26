// pages/blog/[id].js
//
// Public blog article page for The 369 Frequency.
// Fetches a single `truth_vault` row from Supabase by `id` (from the URL)
// and renders it in the site's dark / cyan-blue-purple visual style.
//
// SETUP:
// 1. Save this file as: pages/blog/[id].js  (inside the 369-frequency-website repo)
// 2. No new npm packages needed — it uses a plain fetch() call to Supabase's
//    REST API, so nothing extra to install or configure on Vercel.
// 3. Uses the public/publishable Supabase key, which is safe to have in
//    client-visible code (same key already used elsewhere for this project).

const SUPABASE_URL = 'https://pmqybasqdekytoypctay.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iLSTM2jlAwx7lg7Qy1hhmQ_0Rd5tsxw'

export async function getServerSideProps({ params }) {
  const { id } = params

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/truth_vault?id=eq.${encodeURIComponent(id)}&select=id,fact_title,blog_article,category,source_url`,
    {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  )

  if (!res.ok) {
    return { notFound: true }
  }

  const rows = await res.json()

  if (!rows || rows.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      fact: rows[0],
    },
  }
}

export default function BlogArticle({ fact }) {
  const { fact_title, blog_article, category, source_url } = fact

  // Split the article body into paragraphs for readable rendering.
  const paragraphs = (blog_article || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header / nav — replace this block with your shared <Header /> component
          if one already exists in this repo (e.g. components/Header.js) */}
      <header className="border-b border-slate-800">
        <nav className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent"
          >
            The 369 Frequency
          </a>
          <a
            href="/"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Back to home
          </a>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-3 py-1 mb-6">
            {category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
          {fact_title}
        </h1>

        <article className="space-y-5 text-slate-300 text-lg leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <p className="text-slate-500 italic">This article is not available yet.</p>
          )}
        </article>

        {source_url && (
          <div className="mt-12 pt-6 border-t border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Source
            </h2>
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-cyan-400 break-words transition-colors"
            >
              {source_url}
            </a>
          </div>
        )}
      </main>

      {/* Footer — replace this block with your shared <Footer /> component
          if one already exists in this repo (e.g. components/Footer.js) */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          The Truth, Verified. No Clickbait. Resonating with what matters.
          <br />
          &copy; {new Date().getFullYear()} The 369 Frequency
        </div>
      </footer>
    </div>
  )
}
