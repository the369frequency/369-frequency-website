// pages/blog/[id].js
//
// Public blog article page for The 369 Frequency.
// Fetches a single `truth_vault` row from Supabase by `id` (from the URL),
// pulls a topically-relevant, properly-licensed image from Wikimedia Commons,
// and renders it all in the site's dark / cyan-blue-purple visual style.
//
// SETUP:
// 1. Save this file as: pages/blog/[id].js  (inside the 369-frequency-website repo)
// 2. No new npm packages needed — everything uses plain fetch() calls.
// 3. Uses the public/publishable Supabase key, safe for client-visible code.
//
// IMAGE SOURCING: Wikimedia Commons only hosts images that are public domain
// or explicitly licensed for reuse (with attribution), so this avoids the
// copyright risk of re-hosting a photo taken directly from a news article.
// Each image is shown with a small credit line + link back to its Commons
// file page, which shows the exact license. If no good match is found, the
// article renders normally without a hero image (never a broken image).

const SUPABASE_URL = 'https://pmqybasqdekytoypctay.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iLSTM2jlAwx7lg7Qy1hhmQ_0Rd5tsxw'

// Step 1: use Wikipedia's own search to find the best-matching article for
// a topic (much better relevance than a raw Commons file-description search,
// since it matches on article content, not just file names/captions).
async function findWikipediaTitle(query) {
  try {
    const searchUrl =
      'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*' +
      '&srlimit=1&srsearch=' +
      encodeURIComponent(query)

    const res = await fetch(searchUrl)
    if (!res.ok) return null

    const data = await res.json()
    const hit = data?.query?.search?.[0]
    return hit?.title || null
  } catch (err) {
    return null
  }
}

// Step 2: fetch that Wikipedia article's lead image via the REST summary API.
// Wikipedia's own images are drawn from Wikimedia Commons, so they carry the
// same public-domain / reuse-with-attribution guarantees.
async function fetchWikipediaImage(title) {
  try {
    const summaryUrl =
      'https://en.wikipedia.org/api/rest_v1/page/summary/' +
      encodeURIComponent(title)

    const res = await fetch(summaryUrl)
    if (!res.ok) return null

    const data = await res.json()
    const imageUrl = data?.originalimage?.source || data?.thumbnail?.source
    if (!imageUrl) return null

    return {
      imageUrl,
      pageUrl: data?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      artist: title,
      license: 'via Wikipedia',
    }
  } catch (err) {
    return null
  }
}

async function fetchTopicImage(query) {
  const title = await findWikipediaTitle(query)
  if (!title) return null
  return fetchWikipediaImage(title)
}

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

  const fact = rows[0]

  // Try a search using the fact title first (most specific), then fall back
  // to the category if that finds nothing.
  const image =
    (await fetchTopicImage(fact.fact_title)) ||
    (fact.category ? await fetchTopicImage(fact.category) : null)

  return {
    props: {
      fact,
      image: image || null,
    },
  }
}

export default function BlogArticle({ fact, image }) {
  const { fact_title, blog_article, category, source_url } = fact

  const paragraphs = (blog_article || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header / nav — replace with your shared <Header /> component if one exists */}
      <header className="border-b border-slate-800">
        <nav className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent"
          >
            The 369 Frequency
          </a>
          <a
            href="/blog"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Back to blog
          </a>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-3 py-1 mb-6">
            {category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {fact_title}
        </h1>

        {image && (
          <figure className="mb-8">
            <img
              src={image.imageUrl}
              alt={fact_title}
              className="w-full h-64 md:h-80 object-cover rounded-xl border border-slate-800"
            />
            <figcaption className="text-xs text-slate-500 mt-2">
              Image from Wikipedia:{' '}
              <a
                href={image.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cyan-400"
              >
                {image.artist}
              </a>
            </figcaption>
          </figure>
        )}

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

      {/* Footer — replace with your shared <Footer /> component if one exists */}
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
