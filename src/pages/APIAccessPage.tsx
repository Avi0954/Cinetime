import { FC } from 'react';
import { Link } from 'react-router-dom';

export const APIAccessPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium tracking-wide mb-4">
                    COMING SOON
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    CineTime API
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    Build the next generation of movie discovery tools with our high-performance, real-time data API.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: The Vision */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        The Vision
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We are building a robust, developer-first API that will provide programmatic access to our curated database of global release times. Our goal is to empower developers to create synchronized, region-aware movie experiences.
                        </p>
                    </div>
                </section>

                {/* Section 2: Use Cases */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Potential Use Cases
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">Regional Availability</h3>
                            <p className="text-white/60">Instantly check if a movie is released in specific territories with millisecond precision.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">Countdown Widgets</h3>
                            <p className="text-white/60">Embed accurate, timezone-aware release countdowns directly into your fan sites or applications.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">Scheduling Integrations</h3>
                            <p className="text-white/60">Sync release dates with calendar apps and scheduling tools automatically.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-2">Notification Services</h3>
                            <p className="text-white/60">Power your own discord bots, slack apps, or mobile push notifications.</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Early Access */}
                <section className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-blue-900/10 border border-white/10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Interested in Early Access?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-lg mx-auto">
                        We are currently selecting a small group of partners for our closed beta. If you have a project in mind, we'd love to hear from you.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-black bg-white rounded-full hover:bg-cyan-400 transition-colors"
                    >
                        Contact Us
                    </Link>
                </section>

            </div>
        </div>
    );
};
