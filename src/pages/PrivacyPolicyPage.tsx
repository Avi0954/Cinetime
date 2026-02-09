import { FC } from 'react';

export const PrivacyPolicyPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Privacy Policy
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    Your privacy is important to us. This policy explains how we handle your data.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: Information We Collect */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        1. Information We Collect
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We believe in collecting as little data as possible.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>
                                <strong className="text-white">Email Address:</strong> We only collect your email address if you explicitly sign up for movie release reminders.
                            </li>
                            <li>
                                <strong className="text-white">Usage Data:</strong> We may collect anonymous data about how you use our site to help us improve the experience, but this is never linked to your personal identity.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 2: How We Use Your Data */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        2. How We Use Your Data
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We use your data solely for the purpose for which you provided it:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>To send you the specific movie release reminders you requested.</li>
                            <li>To improve the performance and content of CineTime.</li>
                        </ul>
                        <p className="mt-4">
                            We do <strong>not</strong> sell, trade, or rent your personal identification information to others.
                        </p>
                    </div>
                </section>

                {/* Section 3: Cookies and Local Storage */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        3. Cookies & Local Storage
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            We use modern browser technologies like Local Storage to save your preferences (such as your localized time settings) directly on your device. We do not use invasive tracking cookies to follow you around the web.
                        </p>
                    </div>
                </section>

                {/* Section 4: Your Rights */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        4. Your Rights
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            You have full control over your data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>You can unsubscribe from reminders at any time by clicking the link in any email we send.</li>
                            <li>You can request that we delete your email from our database by contacting us.</li>
                        </ul>
                    </div>
                </section>

            </div>

            {/* Last Updated */}
            <div className="mt-24 pt-8 border-t border-white/5 text-white/40 text-sm">
                <p>Last updated: February 2026</p>
            </div>
        </div>
    );
};
