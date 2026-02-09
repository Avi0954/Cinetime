import { FC } from 'react';

export const TimezoneSyncPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Timezone Synchronization
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    How CineTime ensures you never miss a global premiere, no matter where you are.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: The Problem */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        1. The Problem with Global Releases
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            In the digital age, "Friday Release" doesn't mean the same thing in Tokyo as it does in New York. A movie releasing at midnight PST behaves differently across the globe:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>It's 3:00 AM in New York.</li>
                            <li>It's 8:00 AM in London.</li>
                            <li>It's 5:00 PM in Tokyo.</li>
                        </ul>
                        <p className="mt-4">
                            Missing this conversion means missing the conversation. Spoilers don't wait for your timezone.
                        </p>
                    </div>
                </section>

                {/* Section 2: Our Solution */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        2. How We Synchronize
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            CineTime operates on a strict <strong>Universal Time Coordinated (UTC)</strong> backbone.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>
                                <strong className="text-white">Source of Truth:</strong> Every release date in our database is stored as an absolute point in time (UTC timestamp).
                            </li>
                            <li>
                                <strong className="text-white">Local Conversion:</strong> We detect your device's local timezone settings automatically.
                            </li>
                            <li>
                                <strong className="text-white">Real-Time Adjustment:</strong> When you look at a countdown, our engine calculates the difference between that absolute UTC moment and your current local second.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 3: Accuracy Guarantee */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        3. Accuracy Guarantee
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We don't just guess. Our team actively monitors studio announcements and platform-specific release schedules.
                        </p>
                        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <p className="italic text-white/80">
                                "If Netflix says 12:00 AM PT, we guarantee our countdown hits zero exactly when the clock strikes 12 in Los Angeles, regardless of whether you are watching from Berlin, Mumbai, or Sydney."
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
