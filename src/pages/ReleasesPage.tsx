import { useEffect, useState } from 'react';
import { MovieCard } from '../components/common/MovieCard';
import { useSearch } from '../context/SearchContext';

interface Movie {
    id: string;
    title: string;
    poster_url: string;
    release_at: string;
}

export const ReleasesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { searchQuery } = useSearch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/upcoming`);
                if (!res.ok) throw new Error('Failed to fetch movies');

                const json = await res.json();
                if (json.meta.success) {
                    setMovies(json.data);
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load upcoming releases.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Filter movies based on search query
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className="max-w-7xl mx-auto px-6 pb-24 pt-12">
            {!isSearching && (
                <div className="mb-16 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                            Releases
                        </h1>
                        <p className="text-xl text-white/60 font-light max-w-2xl">
                            Track the latest cinematic arrivals. Stay synchronized with global release times.
                        </p>
                    </div>

                    {/* Release Info Badge / Section */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-4 text-sm text-white/40 tracking-wide uppercase border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Releasing Today / This Week
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Verified Timing
                        </div>
                    </div>
                </div>
            )}

            {isSearching && (
                <div className="mb-8 text-white/60">
                    Search results for: <span className="text-white font-medium">"{searchQuery}"</span>
                </div>
            )}

            {/* Loading / Error States */}
            {loading && (
                <div className="text-center py-20 text-white/50 animate-pulse">
                    Loading releases...
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-400">
                    {error}
                </div>
            )}

            {!loading && !error && filteredMovies.length === 0 && (
                <div className="text-center py-20 text-white/50">
                    {isSearching
                        ? `No movies found matching "${searchQuery}".`
                        : "No releases found. Check back soon."
                    }
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {filteredMovies.map((movie) => (
                    <div key={movie.id} className="aspect-[2/3]">
                        <MovieCard
                            movieId={movie.id}
                            title={movie.title}
                            posterUrl={movie.poster_url}
                            releaseAt={movie.release_at}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
