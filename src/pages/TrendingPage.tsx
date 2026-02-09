import { FC, useEffect, useState } from 'react';
import { MovieCard } from '../components/common/MovieCard';
import { Movie, ApiResponse } from '../types';

export const TrendingPage: FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Reusing the upcoming endpoint as a source of truth for now
                const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/upcoming`);
                if (!res.ok) throw new Error('Failed to fetch movies');

                const json: ApiResponse<Movie[]> = await res.json();
                if (json.meta.success) {
                    setMovies(json.data);
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load trending titles.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Trending Logic (Frontend Simulation)
    // 1. Sort by release date (soonest = "hottest")
    // 2. Pick top 3 as "Featured"
    // 3. Rest as "Trending List"
    const sortedMovies = [...movies].sort((a, b) =>
        new Date(a.release_at).getTime() - new Date(b.release_at).getTime()
    );

    const featured = sortedMovies.slice(0, 3);
    const trendingList = sortedMovies.slice(3, 15); // Show next 12
    const hasMovies = movies.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
            {/* Header */}
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                    Trending <span className="text-accent text-3xl md:text-5xl">🔥</span>
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    The most anticipated titles of the season. Based on global reminder activity and release proximity.
                </p>
            </div>

            {/* Loading / Error States */}
            {loading && (
                <div className="text-center py-20 text-white/50 animate-pulse">
                    Calculating hype levels...
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-400 bg-red-400/10 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && !hasMovies && (
                <div className="text-center py-20 text-white/50 bg-white/5 rounded-lg border border-white/5">
                    No trending titles at the moment.
                </div>
            )}

            {!loading && !error && hasMovies && (
                <div className="space-y-24">

                    {/* Featured Section */}
                    {featured.length > 0 && (
                        <section>
                            <div className="mb-8 flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
                                    Highest Anticipation
                                </h2>
                                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                    Top 3
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {featured.map((movie, index) => (
                                    <div key={movie.id} className="relative">
                                        {/* Rank Badge */}
                                        <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center text-xl font-black text-white shadow-xl shadow-black/50">
                                            #{index + 1}
                                        </div>
                                        <div className="aspect-[2/3] ring-1 ring-white/10 rounded-xl">
                                            <MovieCard
                                                movieId={movie.id}
                                                title={movie.title}
                                                posterUrl={movie.poster_url}
                                                releaseAt={movie.release_at}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Trending List Section */}
                    {trendingList.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-white tracking-wide uppercase mb-8 border-l-4 border-white/20 pl-4">
                                Rising Fast
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {trendingList.map((movie) => (
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
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};
