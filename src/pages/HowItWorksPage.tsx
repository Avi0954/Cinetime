import { FC } from 'react';

export const HowItWorksPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    How CineTime Works
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                    Designed for clarity. Built for precision. Synchronized for you.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-20">
                {/* Section 1: What is CineTime */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-[#E50914] pl-4">
                        The Global Countdown Standard
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            CineTime is the definitive source for movie release countdowns.
                            In an era of fragmenting release schedules—where a movie might drop at midnight EST
                            in New York but 9 AM PST in Los Angeles—confusion is common.
                            CineTime eliminates the guesswork.
                        </p>
                        <p className="mt-4">
                            We track confirmed release data from major studios and streaming platforms directly,
                            converting complex release windows into a single, undeniable ticking clock.
                        </p>
                    </div>
                </section>

                {/* Section 2: Precision Timing */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-blue-500 pl-4">
                        Server-Synced Precision
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            Your device's clock might be fast or slow, but CineTime never drifts.
                            Our countdowns are synchronized with our central atomic-clock-aligned servers.
                            This ensures that when our counter hits zero, the content is actually live.
                        </p>
                    </div>
                </section>

                {/* Section 3: Global Timezone Handling */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4">
                        Intelligent Timezone Localization
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            You don't need to calculate time differences. CineTime automatically detects your
                            local timezone and adjusts every single date and time on the platform to match.
                        </p>
                        <p className="mt-4">
                            Whether you're in Tokyo, London, or New York, the release time you see is
                            the release time for <em>you</em>.
                        </p>
                    </div>
                </section>
            </div>

            {/* Trust Footer */}
            <div className="mt-24 pt-12 border-t border-white/5 text-center">
                <p className="text-white/40 text-sm uppercase tracking-widest">
                    CineTime • Precision You Can Trust
                </p>
            </div>
        </div>
    );
};
