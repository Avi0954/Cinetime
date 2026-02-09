import { FC } from 'react';

export const ContactPage: FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-16 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Contact Support
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                    We're here to help. Whether you have a question about a release date,
                    found a bug, or just want to say hello.
                </p>
            </div>

            {/* Content Card */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-black/50 backdrop-blur-sm">

                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                    Send us an Email
                </h2>

                <p className="text-white/60 mb-8 leading-relaxed">
                    Our support team typically responds within 24 hours.
                    Please include as much detail as possible so we can assist you effectively.
                </p>

                <a
                    href="mailto:support@cinetime.com"
                    className="
                        inline-flex items-center gap-3 px-8 py-4 
                        bg-[#E50914] hover:bg-[#b00710] 
                        text-white font-bold tracking-wide uppercase rounded-full 
                        transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/20
                    "
                >
                    support@cinetime.com
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center text-white/40 text-sm">
                <p>For press inquiries, please contact press@cinetime.com</p>
            </div>
        </div>
    );
};
