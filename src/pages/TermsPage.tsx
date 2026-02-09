import { FC } from 'react';

export const TermsPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Terms of Use
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    By accessing CineTime, you agree to the following terms and conditions.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: Usage Rights */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        1. Acceptance of Terms
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            By accessing or using our service, you agree to be bound by these Terms.
                            If you disagree with any part of the terms, then you may not access the service.
                        </p>
                    </div>
                </section>

                {/* Section 2: Use License */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        2. Use License
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software)
                            on CineTime's website for personal, non-commercial transitory viewing only.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>You may not modify or copy the materials;</li>
                            <li>You may not use the materials for any commercial purpose;</li>
                            <li>You may not attempt to reverse engineer any software contained on CineTime;</li>
                        </ul>
                    </div>
                </section>

                {/* Section 3: Disclaimer */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        3. Disclaimer
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            The materials on CineTime are provided on an 'as is' basis. CineTime makes no warranties,
                            expressed or implied, and hereby disclaims and negates all other warranties including,
                            without limitation, implied warranties or conditions of merchantability, fitness for a
                            particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </div>
                </section>

                {/* Section 4: Accuracy of Materials */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        4. Accuracy of Materials
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            The materials appearing on CineTime could include technical, typographical, or photographic errors.
                            CineTime does not warrant that any of the materials on its website are accurate, complete, or current.
                            CineTime may make changes to the materials contained on its website at any time without notice.
                        </p>
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
