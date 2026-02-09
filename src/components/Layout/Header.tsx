import { FC, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

export const Header: FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDiscoverOpen, setIsMobileDiscoverOpen] = useState(false);
    const timeoutRef = useRef<any>(null);
    const location = useLocation();

    // Helper to check if a link is active
    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Also cleanup in case component unmounts
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsDiscoverOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsDiscoverOpen(false);
        }, 150);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ease-in-out border-b ${scrolled
                ? 'bg-[#050505]/95 backdrop-blur-md border-white/5 shadow-xl'
                : 'bg-gradient-to-b from-[#050505] to-transparent border-transparent'
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-full flex items-center justify-between relative gap-4 md:gap-0">

                {/* 1. Left: Logo */}
                <div className="flex-shrink-0 z-50 relative">
                    <Link to="/" className="group flex items-center gap-2">
                        <div className="text-2xl font-bold tracking-tighter uppercase text-white transition-opacity group-hover:opacity-90">
                            Cine<span className="text-[#E50914]">Time</span>
                        </div>
                    </Link>
                </div>

                {/* 2. Mobile Search (Centered) */}
                <div className="flex-1 max-w-md md:hidden mx-2">
                    <SearchInput mobile />
                </div>

                {/* 3. Center: Navigation (Desktop) */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 h-full">
                    <NavLink
                        to="/"
                        label="Releases"
                        isActive={isActive('/')}
                    />
                    <NavLink
                        to="/trending"
                        label="Trending"
                        isActive={isActive('/trending')}
                    />
                    <NavLink
                        to="/upcoming"
                        label="Upcoming"
                        isActive={isActive('/upcoming')}
                    />

                    {/* Discover Dropdown Trigger */}
                    <div
                        className="relative h-full flex items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            className={`
                                text-[14px] font-medium tracking-wide transition-colors duration-200 flex items-center gap-1.5 py-2
                                ${isDiscoverOpen || isActive('/discover') ? 'text-white' : 'text-white/60 hover:text-white'}
                            `}
                        >
                            Discover
                            <svg
                                className={`w-3 h-3 transition-transform duration-300 opacity-60 ${isDiscoverOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className={`
                                absolute top-[calc(100%)] left-1/2 -translate-x-1/2 w-[640px] 
                                bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl shadow-black/50 
                                p-8 grid grid-cols-3 gap-8 
                                transition-all duration-200 origin-top z-50
                                backdrop-blur-xl bg-opacity-95
                                ${isDiscoverOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
                            `}
                        >
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Industries</h4>
                                <div className="flex flex-col gap-2">
                                    <DropdownItem label="Hollywood" to="/discover/region/hollywood" />
                                    <DropdownItem label="Bollywood" to="/discover/region/bollywood" />
                                    <DropdownItem label="South Indian" to="/discover/region/south-indian" />
                                    <DropdownItem label="International" to="/discover/region/international" />
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Platforms</h4>
                                <div className="flex flex-col gap-2">
                                    <DropdownItem label="Netflix" to="/discover/platform/netflix" />
                                    <DropdownItem label="Prime Video" to="/discover/platform/prime-video" />
                                    <DropdownItem label="Disney+" to="/discover/platform/disney-plus" />
                                    <DropdownItem label="Apple TV+" to="/discover/platform/apple-tv" />
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Categories</h4>
                                <div className="flex flex-col gap-2">
                                    <DropdownItem label="Movies" to="/discover/category/movies" />
                                    <DropdownItem label="TV Shows" to="/discover/category/tv-shows" />
                                    <DropdownItem label="Documentaries" to="/discover/category/documentaries" />
                                    <DropdownItem label="Top Rated" to="/discover/category/top-rated" />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* 4. Right: Search (Desktop) + Actions */}
                <div className="flex items-center gap-6 z-50 relative">
                    {/* Desktop Search Input */}
                    <div className="hidden md:block">
                        <SearchInput />
                    </div>

                    <Link
                        to="/mylist"
                        className={`hidden sm:block text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isActive('/mylist') ? 'text-white' : 'text-white/60 hover:text-white'}`}
                    >
                        My List
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden text-white hover:text-white/80 transition-colors p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300
                    ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={`
                    fixed top-0 right-0 h-[100dvh] w-[280px] bg-[#0A0A0A] border-l border-white/10 z-[70] md:hidden 
                    shadow-2xl transform transition-transform duration-300 ease-out
                    flex flex-col p-6 overflow-y-auto
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-bold text-white tracking-tight">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white/60 hover:text-white transition-colors p-2 -mr-2"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col gap-2">
                    <MobileNavLink to="/" label="Releases" isActive={isActive('/')} />
                    <MobileNavLink to="/trending" label="Trending" isActive={isActive('/trending')} />
                    <MobileNavLink to="/upcoming" label="Upcoming" isActive={isActive('/upcoming')} />
                    <MobileNavLink to="/trending" label="Trending" isActive={isActive('/trending')} />
                    <MobileNavLink to="/upcoming" label="Upcoming" isActive={isActive('/upcoming')} />

                    {/* Mobile Discover Accordion */}
                    <div className="overflow-hidden">
                        <button
                            onClick={() => setIsMobileDiscoverOpen(!isMobileDiscoverOpen)}
                            className={`
                                w-full flex items-center justify-between text-lg font-medium tracking-wide transition-colors duration-200 py-2 px-2 rounded-lg
                                ${isMobileDiscoverOpen || isActive('/discover') ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            Discover
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 opacity-60 ${isMobileDiscoverOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            className={`
                                flex flex-col gap-1 pl-4 border-l border-white/10 ml-4 mt-2 transition-all duration-300 ease-in-out
                                ${isMobileDiscoverOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                            `}
                        >
                            <div className="pt-2 pb-1">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-2">Industries</span>
                                <div className="flex flex-col mt-1">
                                    <MobileSubLink to="/discover/region/hollywood" label="Hollywood" />
                                    <MobileSubLink to="/discover/region/bollywood" label="Bollywood" />
                                    <MobileSubLink to="/discover/region/south-indian" label="South Indian" />
                                </div>
                            </div>

                            <div className="py-1">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-2">Platforms</span>
                                <div className="flex flex-col mt-1">
                                    <MobileSubLink to="/discover/platform/netflix" label="Netflix" />
                                    <MobileSubLink to="/discover/platform/prime-video" label="Prime Video" />
                                    <MobileSubLink to="/discover/platform/disney-plus" label="Disney+" />
                                </div>
                            </div>

                            <div className="py-1">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-2">Categories</span>
                                <div className="flex flex-col mt-1">
                                    <MobileSubLink to="/discover/category/movies" label="Movies" />
                                    <MobileSubLink to="/discover/category/tv-shows" label="TV Shows" />
                                    <MobileSubLink to="/discover/category/top-rated" label="Top Rated" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[1px] bg-white/10 my-4"></div>
                    <MobileNavLink to="/mylist" label="My List" isActive={isActive('/mylist')} />
                </nav>
            </div>
        </header>
    );
};

// Helper Components
interface NavLinkProps {
    to: string;
    label: string;
    isActive?: boolean;
}

const NavLink = ({ to, label, isActive }: NavLinkProps) => (
    <Link
        to={to}
        className={`
            relative px-0 py-2 text-[14px] font-medium tracking-wide transition-colors duration-200
            ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
        `}
    >
        {label}
        {/* Active Indicator - Subtle Underline */}
        <span
            className={`
                absolute bottom-0 left-0 w-full h-[2px] bg-[#E50914] rounded-full 
                transition-transform duration-300 origin-center
                ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
            `}
        />
    </Link>
);

const MobileNavLink = ({ to, label, isActive }: NavLinkProps) => (
    <Link
        to={to}
        className={`
            block text-lg font-medium tracking-wide transition-colors duration-200 py-2 px-2 rounded-lg
            ${isActive ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}
        `}
    >
        {label}
    </Link>
);

const MobileSubLink = ({ to, label }: { to: string, label: string }) => (
    <Link
        to={to}
        className="block text-sm text-white/50 hover:text-white transition-colors py-1.5 px-2 rounded hover:bg-white/5"
    >
        {label}
    </Link>
);

const DropdownItem = ({ label, to }: { label: string; to: string }) => (
    <Link to={to} className="block text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">
        {label}
    </Link>
);

interface SearchInputProps {
    mobile?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ mobile }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localQuery, setLocalQuery] = useState('');
    const { setSearchQuery } = useSearch();

    // Debounce search query updates
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [localQuery, setSearchQuery]);

    return (
        <div
            className={`
                relative group transition-all duration-300
                ${mobile ? 'w-full' : (isFocused ? 'w-64' : 'w-56')}
            `}
        >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                    className={`h-4 w-4 transition-colors duration-200 ${isFocused ? 'text-white' : 'text-white/40'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="
                    w-full bg-white/5 hover:bg-white/10 focus:bg-white/10
                    text-sm text-white placeholder-white/30
                    rounded-full pl-10 pr-4 py-2.5
                    transition-all duration-300 ease-out
                    border border-transparent focus:border-white/10 focus:outline-none focus:ring-0
                "
                placeholder="Search movies..."
            />
        </div>
    );
};
