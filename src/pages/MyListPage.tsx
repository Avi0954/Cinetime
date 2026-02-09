import { FC, useState, useMemo, useEffect } from 'react';
import { useMyList } from '../context/MyListContext';
import { MovieCard } from '../components/common/MovieCard';
import { Link } from 'react-router-dom';

type SortOption = 'releaseDate' | 'dateAdded';
type FilterOption = 'all' | 'upcoming' | 'released';

export const MyListPage: FC = () => {
    const { myList } = useMyList();
    const [sortBy, setSortBy] = useState<SortOption>('releaseDate');
    const [filterBy, setFilterBy] = useState<FilterOption>('all');

    // Update Page Title
    useEffect(() => {
        document.title = 'My List - CineTime';
    }, []);

    // Filter & Sort Logic
    const processedList = useMemo(() => {
        let filtered = [...myList];
        const now = new Date();

        const getSafeDate = (dateStr: string | undefined): number => {
            if (!dateStr) return 0;
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? 0 : date.getTime();
        };

        // 1. Filter
        if (filterBy === 'upcoming') {
            filtered = filtered.filter(m => getSafeDate(m.releaseAt) > now.getTime());
        } else if (filterBy === 'released') {
            filtered = filtered.filter(m => getSafeDate(m.releaseAt) <= now.getTime());
        }

        // 2. Sort
        return filtered.sort((a, b) => {
            if (sortBy === 'releaseDate') {
                return getSafeDate(a.releaseAt) - getSafeDate(b.releaseAt);
            } else {
                return (b.addedAt || 0) - (a.addedAt || 0);
            }
        });
    }, [myList, sortBy, filterBy]);

    if (myList.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Your list is empty</h2>
                <p className="text-white/60 max-w-md mb-8">
                    Start exploring movies and add them to your list to keep track of what you want to watch.
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-[#E50914] text-white font-bold rounded hover:bg-[#b00710] transition-colors"
                >
                    Browse Releases
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 md:py-20 min-h-screen">
            {/* Header Section */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-8 w-1 bg-[#E50914] rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            My List <span className="text-white/40 font-normal text-2xl ml-2">({myList.length})</span>
                        </h1>
                    </div>
                    <p className="text-white/60 text-sm md:text-base ml-5">
                        Manage and track your saved movies.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Filter Tabs */}
                    <div className="flex bg-white/5 p-1 rounded-lg">
                        {(['all', 'upcoming', 'released'] as FilterOption[]).map((option) => (
                            <button
                                key={option}
                                onClick={() => setFilterBy(option)}
                                className={`
                                    px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                                    ${filterBy === option ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}
                                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown (Simulated with button toggle for simplicity) */}
                    <button
                        onClick={() => setSortBy(prev => prev === 'releaseDate' ? 'dateAdded' : 'releaseDate')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        Sort by: <span className="text-white">{sortBy === 'releaseDate' ? 'Release Date' : 'Date Added'}</span>
                    </button>
                </div>
            </header>

            {/* Content Grid */}
            {processedList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {processedList.map((movie) => (
                        <div key={movie.movieId} className="h-full">
                            <MovieCard
                                movieId={movie.movieId}
                                title={movie.title}
                                posterUrl={movie.posterUrl}
                                releaseAt={movie.releaseAt}
                                variant="mylist"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                    <p className="text-white/40 text-lg">No {filterBy === 'all' ? '' : filterBy} movies in your list.</p>
                    <button
                        onClick={() => setFilterBy('all')}
                        className="mt-4 text-[#E50914] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        View All
                    </button>
                </div>
            )}
        </div>
    );
};
