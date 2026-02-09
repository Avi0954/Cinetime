import { FC, useEffect, useState } from 'react';
import { MovieCard } from '../components/common/MovieCard';
import { Movie, ApiResponse } from '../types';

interface GroupedMovies {
    thisWeek: Movie[];
    thisMonth: Movie[];
    later: Movie[];
}

export const UpcomingPage: FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Since this is a demo, we might want to ensure we're getting enough data.
                // For now, reusing the upcoming endpoint.
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

    // Helper to group movies
    const groupMovies = (movies: Movie[]): GroupedMovies => {
        const now = new Date();
        const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        const grouped: GroupedMovies = {
            thisWeek: [],
            thisMonth: [],
            later: []
        };

        movies.forEach(movie => {
            const releaseDate = new Date(movie.release_at);

            if (releaseDate <= oneWeek) {
                grouped.thisWeek.push(movie);
            } else if (releaseDate <= oneMonth) {
                grouped.thisMonth.push(movie);
            } else {
                grouped.later.push(movie);
            }
        });

        // Sort each group by date
        const sortByDate = (a: Movie, b: Movie) =>
            new Date(a.release_at).getTime() - new Date(b.release_at).getTime();

        grouped.thisWeek.sort(sortByDate);
        grouped.thisMonth.sort(sortByDate);
        grouped.later.sort(sortByDate);

        return grouped;
    };

    const groupedMovies = groupMovies(movies);
    const hasMovies = movies.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
            {/* Header */}
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    Upcoming Releases
                </h1>
                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    Track the biggest moments in cinema. Synchronized to your timezone.
                </p>
            </div>

            {/* Loading / Error States */}
            {loading && (
                <div className="text-center py-20 text-white/50 animate-pulse">
                    Loading calendar...
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-400 bg-red-400/10 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && !hasMovies && (
                <div className="text-center py-20 text-white/50 bg-white/5 rounded-lg border border-white/5">
                    No upcoming releases found. Check back soon.
                </div>
            )}

            {/* Content Groups */}
            {!loading && !error && hasMovies && (
                <div className="space-y-24">

                    {/* This Week */}
                    {groupedMovies.thisWeek.length > 0 && (
                        <MovieSection
                            title="Releasing This Week"
                            movies={groupedMovies.thisWeek}
                            description="Get ready. These titles are dropping within 7 days."
                        />
                    )}

                    {/* This Month */}
                    {groupedMovies.thisMonth.length > 0 && (
                        <MovieSection
                            title="Coming This Month"
                            movies={groupedMovies.thisMonth}
                            description="Mark your calendars. Less than 30 days to go."
                        />
                    )}

                    {/* Later */}
                    {groupedMovies.later.length > 0 && (
                        <MovieSection
                            title="On The Horizon"
                            movies={groupedMovies.later}
                            description="Worth the wait. Major releases coming soon."
                        />
                    )}
                </div>
            )}
        </div>
    );
};

// Sub-component for sections
interface MovieSectionProps {
    title: string;
    movies: Movie[];
    description?: string;
}

const MovieSection: FC<MovieSectionProps> = ({ title, movies, description }) => (
    <section>
        <div className="mb-8 border-l-4 border-accent pl-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide uppercase mb-2">
                {title}
            </h2>
            {description && (
                <p className="text-white/50 text-sm md:text-base">
                    {description}
                </p>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
            {movies.map((movie) => (
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
);
