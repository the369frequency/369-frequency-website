import React, { useState } from 'react';
import { Mail, Youtube, TikTok, Instagram, Send } from 'lucide-react';

export default function The369Frequency() {
  const [email, setEmail] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Email signup:', email);
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    if (sponsorEmail) {
      window.location.href = `mailto:hello@the369frequency.com?subject=Sponsorship Inquiry&body=Email: ${sponsorEmail}`;
      setSponsorSubmitted(true);
      setSponsorEmail('');
      setTimeout(() => setSponsorSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            369
          </div>
          <div className="flex gap-4">
            <a href="#subscribe" className="text-sm text-slate-300 hover:text-white transition">Subscribe</a>
            <a href="#sponsors" className="text-sm text-slate-300 hover:text-white transition">Sponsors</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">⚡</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The 369 Frequency
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl sm:text-3xl text-slate-200 font-semibold max-w-2xl mx-auto">
            The Truth, Verified. No Clickbait.
          </p>

          {/* Description */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Decoded facts from verified sources. History • Geography • Math.
            <br />
            No sensationalism. Just truth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            
              href="https://www.youtube.com/@the369frequency"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Youtube size={20} />
              Watch on YouTube
            </a>
            
              href="https://www.tiktok.com/@the369frequency"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <TikTok size={20} />
              Follow on TikTok
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About The 369 Frequency</h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Column 1: History */}
            <div className="space-y-4">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-semibold">History</h3>
              <p className="text-slate-300">
                Verified facts about ancient civilizations, historical events, and the stories that shaped our world.
              </p>
            </div>

            {/* Column 2: Geography */}
            <div className="space-y-4">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold">Geography</h3>
              <p className="text-slate-300">
                Explore Earth's wonders, from the deepest trenches to the highest peaks, backed by science.
              </p>
            </div>

            {/* Column 3: Math */}
            <div className="space-y-4">
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-xl font-semibold">Mathematics</h3>
              <p className="text-slate-300">
                Patterns, constants, and the elegant logic that governs the universe explained clearly.
              </p>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-16 p-8 bg-slate-700/50 rounded-lg border border-slate-600">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span>✓</span> Verified. Always.
            </h3>
            <p className="text-slate-300 mb-4">
              Every fact is sourced from Tier 1 verified sources: government agencies, peer-reviewed research, scientific institutions, and reputable museums.
            </p>
            <p className="text-slate-300">
              We cite our sources. You can verify everything we say. That's the difference between facts and clickbait.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="subscribe" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get Weekly Verified Facts</h2>
            <p className="text-slate-300">Join our community of truth-seekers. No spam, just verified insights.</p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Subscribe
              </button>
            </div>
            {emailSubmitted && (
              <p className="text-green-400 text-sm">✓ Thanks for subscribing! Check your email to confirm.</p>
            )}
          </form>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Interested in Sponsoring?</h2>
            <p className="text-slate-300">
              Reach an audience that values truth. Our viewers are educators, learners, and decision-makers.
            </p>
          </div>

          <form onSubmit={handleSponsorSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={sponsorEmail}
                onChange={(e) => setSponsorEmail(e.target.value)}
                placeholder="Your business email"
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-pink-400 transition"
              >
                Send Inquiry
              </button>
            </div>
            {sponsorSubmitted && (
              <p className="text-green-400 text-sm">✓ We'll be in touch soon!</p>
            )}
          </form>

          <p className="text-slate-400 text-sm mt-6 text-center">
            Or email directly: <a href="mailto:hello@the369frequency.com" className="text-cyan-400 hover:text-cyan-300">hello@the369frequency.com</a>
          </p>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">Follow Us</h3>
          
          <div className="flex justify-center gap-8">
            
              href="https://www.youtube.com/@the369frequency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-500 transition transform hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube size={32} />
            </a>
            
              href="https://www.tiktok.com/@the369frequency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition transform hover:scale-110"
              aria-label="TikTok"
            >
              <TikTok size={32} />
            </a>
            
              href="https://www.instagram.com/the369frequency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-500 transition transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={32} />
            </a>
            
              href="mailto:hello@the369frequency.com"
              className="text-slate-400 hover:text-cyan-400 transition transform hover:scale-110"
              aria-label="Email"
            >
              <Mail size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        <p>© 2026 The 369 Frequency. The Truth, Verified. No Clickbait.</p>
      </footer>
    </div>
  );
}
