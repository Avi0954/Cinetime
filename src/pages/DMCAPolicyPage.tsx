import { FC } from 'react';

export const DMCAPolicyPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    DMCA Policy
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    Respecting intellectual property rights and ensuring compliance.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">

                {/* Section 1: Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Respect for Copyright
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            CineTime respects the intellectual property rights of others and expects its users to do the same.
                            It is our policy, in appropriate circumstances and at our discretion, to disable and/or terminate
                            the accounts of users who repeatedly infringe or are repeatedly charged with infringing the
                            copyrights or other intellectual property rights of others.
                        </p>
                    </div>
                </section>

                {/* Section 2: Reporting Claims */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Submitting a DMCA Takedown Notice
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act
                            under any exclusive right under copyright, please report alleged copyright infringements taking
                            place on or through the Site by creating a Notice containing the following information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-white/60">
                            <li>
                                Identification of the copyrighted work claimed to have been infringed.
                            </li>
                            <li>
                                Identification of the material that is claimed to be infringing or to be the subject of infringing activity.
                            </li>
                            <li>
                                Your contact information, including your address, telephone number, and an email address.
                            </li>
                            <li>
                                A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                            </li>
                            <li>
                                A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 3: Contact */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Designated Copyright Agent
                    </h2>
                    <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
                        <p>
                            Please send your notice to our designated Copyright Agent at:
                        </p>
                        <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
                            <p className="font-bold text-white mb-2">CineTime Operations Team</p>
                            <p>Attn: Copyright Agent</p>
                            <p>123 Cinema Boulevard</p>
                            <p>Los Angeles, CA 90028</p>
                            <p className="mt-4 text-[#E50914]">Email: legal@cinetime.com</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
