import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8" aria-label="Footer">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-md"
                            aria-label="CineTime Home"
                        >
                            <div className="text-2xl font-bold tracking-tighter uppercase text-white transition-opacity group-hover:opacity-90">
                                Cine<span className="text-[#E50914]">Time</span>
                            </div>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            The world's most precise movie release countdown. Synchronized globally. Experienced locally.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <nav aria-label="Site Navigation">
                        <h3 className="text-white font-bold tracking-wide mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <FooterLink to="/releases" label="Releases" />
                            <FooterLink to="/trending" label="Trending" />
                            <FooterLink to="/upcoming" label="Upcoming" />
                            <FooterLink to="/discover" label="Discover" />
                        </ul>
                    </nav>

                    {/* Column 3: Product */}
                    <nav aria-label="Product Information">
                        <h3 className="text-white font-bold tracking-wide mb-6">Product</h3>
                        <ul className="space-y-4">
                            <FooterLink to="/how-it-works" label="How it Works" />
                            <FooterLink to="/reminders" label="Reminders" />
                            <FooterLink to="/timezone-sync" label="Timezone Sync" />
                            <FooterLink to="/api" label="API Access" />
                        </ul>
                    </nav>

                    {/* Column 4: Legal & Contact */}
                    <nav aria-label="Legal & Company">
                        <h3 className="text-white font-bold tracking-wide mb-6">Company</h3>
                        <ul className="space-y-4">
                            <FooterLink to="/privacy" label="Privacy Policy" />
                            <FooterLink to="/terms" label="Terms of Use" />
                            <FooterLink to="/contact" label="Contact Support" />
                            <FooterLink to="/dmca" label="DMCA" />
                        </ul>
                    </nav>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/50 uppercase tracking-widest">
                    <p>© {currentYear} CineTime Corporation. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <span>Made with precision</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Component
const FooterLink = ({ to, label }: { to: string, label: string }) => {
    const isPlaceholder = to === '#';

    return (
        <li>
            <Link
                to={to}
                onClick={(e) => isPlaceholder && e.preventDefault()}
                className={`
                    text-muted hover:text-white transition-colors duration-200 text-sm 
                    focus-visible:outline-none focus-visible:text-white focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm
                    ${isPlaceholder ? 'cursor-default hover:text-muted' : ''}
                `}
                aria-disabled={isPlaceholder}
            >
                {label}
            </Link>
        </li>
    );
};
