import { FC } from 'react';

export const RemindersPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Reminders
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    Never miss a premiere. Get notified the moment your most anticipated movies drop.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: How It Works */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        1. How It Works
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            Setting a reminder is simple and secure:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 mt-4 text-white/60">
                            <li>Find a movie you're excited about.</li>
                            <li>Click the <span className="text-cyan-400 font-bold">"Remind Me"</span> button.</li>
                            <li>Enter your email address.</li>
                        </ol>
                        <p className="mt-4">
                            That's it. We don't require you to create an account, remember a password, or download an app.
                        </p>
                    </div>
                </section>

                {/* Section 2: When We Notify You */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        2. Precision Timing
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We value your inbox. You will receive exactly <strong>one</strong> email per movie:
                        </p>
                        <div className="flex items-start gap-4 mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-2xl">📧</div>
                            <div>
                                <h4 className="font-bold text-white">The "It's Time" Email</h4>
                                <p className="text-sm text-white/60 mt-1">
                                    Sent exactly when the movie becomes available in your region (or upon global release). No "hype" emails, no "news" emails, just the notification you asked for.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: No Spam Promise */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        3. Our No-Spam Promise
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We are movie fans, not marketers.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>We <strong>never</strong> sell your email address.</li>
                            <li>We <strong>never</strong> send newsletters you didn't subscribe to.</li>
                            <li>We <strong>never</strong> spam you with unrelated promotions.</li>
                        </ul>
                        <p className="mt-4">
                            Once your reminder is sent, your obligation to us (and ours to you) is complete.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};
