// pages/blog/index.js
//
// Public blog listing page for The 369 Frequency.
// Fetches all `truth_vault` rows that have an approved blog_article and
// lists them as cards, linking each to /blog/[id].
//
// SETUP: save this file as pages/blog/index.js (alongside pages/blog/[id].js)
// in the 369-frequency-website repo. No new npm packages needed.

const SUPABASE_URL = 'https://pmqybasqdekytoypctay.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iLSTM2jlAwx7lg7Qy1hhmQ_0Rd5tsxw'

export async function getServerSideProps() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/truth_vault?blog_article=not.is.null&select=id,fact_title,category,blog_article&order=id.desc`,
    {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  )

  if (!res.ok) {
    return { props: { articles: [] } }
  }

  const rows = await res.json()

  const articles = (rows || []).map((row) => {
    const firstParagraph = (row.blog_article || '')
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)[0] || ''
    return {
      id: row.id,
      fact_title: row.fact_title,
      category: row.category,
      excerpt:
        firstParagraph.length > 180
          ? firstParagraph.slice(0, 180).trim() + '…'
          : firstParagraph,
    }
  })

  return { props: { articles } }
}

export default function BlogIndex({ articles }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Replace with your shared <Header /> component if one exists */}
      <header className="border-b border-slate-800">
        <nav className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-400 mb-10">
          The Truth, Verified. No Clickbait. Resonating with what matters.
        </p>

        {articles.length === 0 ? (
          <p className="text-slate-500 italic">No articles published yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/blog/${article.id}`}
                className="block bg-slate-800/50 border border-slate-800 hover:border-cyan-400/50 rounded-xl p-6 transition-colors"
              >
                {article.category && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-3 py-1 mb-3">
                    {article.category}
                  </span>
                )}
                <h2 className="text-xl font-bold mb-2">{article.fact_title}</h2>
                {article.excerpt && (
                  <p className="text-slate-400 leading-relaxed">{article.excerpt}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Replace with your shared <Footer /> component if one exists */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          The Truth, Verified. No Clickbait. Resonating with what matters.
          <br />
          &copy; {new Date().getFullYear()} The 369 Frequency
        </div>
      </footer>
    </div>
  )
}
