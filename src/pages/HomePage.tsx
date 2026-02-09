import { useEffect, useState } from 'react';
import { MovieCard } from '../components/common/MovieCard';
import { useSearch } from '../context/SearchContext';
import { Movie, ApiResponse } from '../types';

export const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { searchQuery } = useSearch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/upcoming`);
                if (!res.ok) throw new Error('Failed to fetch movies');

                const json: ApiResponse<Movie[]> = await res.json();
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
        <div className="max-w-7xl mx-auto px-6 pb-24">
            {/* Hero Section - Hide when searching? Optional. Let's keep it but maybe condense it if needed. For now, keep it. */}
            {/* Hero Section - Centered & Cinematic */}
            {!isSearching && (
                <div className="min-h-[35vh] md:min-h-[45vh] flex flex-col justify-center items-center text-center space-y-6 animate-fade-in mb-6">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight max-w-4xl">
                        The <span className="text-accent">Wait</span> is Part of the <span className="text-white/50">Experience</span>
                    </h1>
                    <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                        Track the exact seconds until the year's most anticipated cinematic events.
                        Synchronized globally. Experienced locally.
                    </p>
                </div>
            )}

            {isSearching && (
                <div className="pt-24 mb-8 text-white/60">
                    Search results for: <span className="text-white font-medium">"{searchQuery}"</span>
                </div>
            )}

            {/* Loading / Error States */}
            {loading && (
                <div className="text-center py-20 text-white/50 animate-pulse">
                    Loading upcoming releases...
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
                        : "No upcoming movies found. Check back soon."
                    }
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
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
