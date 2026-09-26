import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-cyan-400">369</div>
          <div className="flex gap-6">
            <a href="/blog" className="text-sm hover:text-white">Blog</a>
            <a href="#subscribe" className="text-sm hover:text-white">Subscribe</a>
            <a href="#sponsors" className="text-sm hover:text-white">Sponsors</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-4xl">⚡</div>
          </div>

          <h1 className="text-6xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">The 369 Frequency</span>
          </h1>

          <p className="text-3xl text-slate-200 font-semibold">The Truth, Verified. No Clickbait.</p>
          <p className="text-lg text-slate-400 mt-2">Resonating with what matters.</p>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Decoded facts from verified sources. History • Geography • Math. No sensationalism. Just truth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="https://www.youtube.com/@the369frequency" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold">Watch on YouTube</a>
            <a href="https://www.tiktok.com/@the369frequency" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold">Follow on TikTok</a>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About The 369 Frequency</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">📜</div>
              <h3 className="text-xl font-semibold">History</h3>
              <p className="text-slate-300">Verified facts about ancient civilizations, historical events, and the stories that shaped our world.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🗺️</div>
              <h3 className="text-xl font-semibold">Geography</h3>
              <p className="text-slate-300">Explore Earth's wonders, from the deepest trenches to the highest peaks, backed by science.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📐</div>
              <h3 className="text-xl font-semibold">Mathematics</h3>
              <p className="text-slate-300">Patterns, constants, and the elegant logic that governs the universe explained clearly.</p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-slate-700/50 rounded-lg border border-slate-600">
            <h3 className="text-2xl font-semibold mb-4">✓ Verified. Always.</h3>
            <p className="text-slate-300 mb-4">Every fact is sourced from Tier 1 verified sources: government agencies, peer-reviewed research, scientific institutions, and reputable museums.</p>
            <p className="text-slate-300">We cite our sources. You can verify everything we say. That's the difference between facts and clickbait.</p>
          </div>
        </div>
      </section>

      <section id="subscribe" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get Weekly Verified Facts</h2>
            <p className="text-slate-300">Join our community of truth-seekers. No spam, just verified insights.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400" required />
              <button type="submit" className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:from-cyan-300 hover:to-blue-400">Subscribe</button>
            </div>
            {submitted && <p className="text-green-400 text-sm">✓ Thanks for subscribing!</p>}
          </form>
        </div>
      </section>

      <section id="sponsors" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Interested in Sponsoring?</h2>
            <p className="text-slate-300">Reach an audience that values truth. Our viewers are educators, learners, and decision-makers.</p>
          </div>
          <div className="text-center">
            <a href="mailto:hello@the369frequency.com" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-pink-400">Send Inquiry</a>
            <p className="text-slate-400 text-sm mt-6">Or email: <a href="mailto:hello@the369frequency.com" className="text-cyan-400">hello@the369frequency.com</a></p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">Follow Us</h3>
          <div className="flex justify-center gap-8">
            <a href="https://www.youtube.com/@the369frequency" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition">YouTube</a>
            <a href="https://www.tiktok.com/@the369frequency" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">TikTok</a>
            <a href="https://www.instagram.com/the369frequency" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition">Instagram</a>
            <a href="mailto:hello@the369frequency.com" className="text-slate-400 hover:text-cyan-400 transition">Email</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-700 py-8 px-6 text-center text-slate-400">
        <p>© 2026 The 369 Frequency. The Truth, Verified. No Clickbait.</p>
      </footer>
    </div>
  );
}
