import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/common/MovieCard';
import { Movie, ApiResponse } from '../types';

// Extended interface for frontend filtering demo
interface ExtendedMovie extends Movie {
    platforms: string[];
    genres: string[];
    category: 'movies' | 'tv-shows' | 'documentaries';
    isTopRated: boolean;
}

// Category Page Configuration
const CATEGORY_CONFIG: Record<string, { title: string; description: string }> = {
    'movies': {
        title: 'Movies',
        description: 'Explore the latest blockbusters and indie gems coming soon to theaters and streaming.'
    },
    'tv-shows': {
        title: 'TV Shows',
        description: 'Stay up to date with new seasons and series premieres from your favorite networks.'
    },
    'documentaries': {
        title: 'Documentaries',
        description: 'Real stories, real people. Discover upcoming documentaries that will change your perspective.'
    },
    'top-rated': {
        title: 'Top Rated',
        description: 'The most anticipated and critically acclaimed titles according to our community.'
    }
};

export const DiscoverListPage: FC = () => {
    const { type, slug } = useParams<{ type: string; slug: string }>();
    const [movies, setMovies] = useState<ExtendedMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Capitalize helper
    const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    const formatSlug = (s: string) => s?.replace(/-/g, ' ').split(' ').map(capitalize).join(' ') || '';

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError('');
            try {
                // Fetch all movies from the new endpoint
                const res = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
                if (!res.ok) throw new Error('Failed to fetch movies');

                const json: ApiResponse<Movie[]> = await res.json();

                if (json.meta.success) {
                    // Map API response to ExtendedMovie (handling potentially missing fields safely)
                    const realMovies: ExtendedMovie[] = json.data.map((m: any) => ({
                        ...m,
                        platforms: m.platforms || [],
                        genres: m.genres || [],
                        category: m.category || 'movies',
                        isTopRated: !!m.is_top_rated
                    }));
                    setMovies(realMovies);
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load discovery content.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [type, slug]); // Refetch/Reset if params change (though logic is client side, nice to reset loading)

    // Filter Logic
    const filteredMovies = movies.filter(movie => {
        if (!type || !slug) return true;
        const targetType = type.toLowerCase();
        const targetSlug = slug.toLowerCase();

        if (targetType === 'platform') {
            return movie.platforms.includes(targetSlug);
        }
        if (targetType === 'genre') {
            return movie.genres.includes(targetSlug);
        }
        if (targetType === 'category') {
            if (targetSlug === 'top-rated') {
                return movie.isTopRated;
            }
            return movie.category === targetSlug;
        }
        if (targetType === 'region') {
            // Mock region logic: assume all are global for now, or filter by some criteria
            return true;
        }

        return false;
    });

    // Display Logic
    const categoryKey = slug?.toLowerCase();
    const isCategory = type?.toLowerCase() === 'category';
    const config = isCategory && categoryKey && CATEGORY_CONFIG[categoryKey];

    const displayTitle = config ? config.title : formatSlug(slug || '');
    const subtitleType = type === 'platform' ? 'Platform' : type === 'region' ? 'Region' : 'Genre';
    const displaySubtitle = config ? config.description : `Browsing ${subtitleType}: ${displayTitle}`;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
            {/* Header */}
            <div className="mb-16 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-white/50 text-sm uppercase tracking-widest font-medium">
                    <span>Discover</span>
                    <span>/</span>
                    <span className="text-accent">{capitalize(type || '')}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    {displayTitle}
                </h1>

                <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
                    {displaySubtitle}
                </p>
            </div>

            {/* Loading / Error States */}
            {loading && (
                <div className="text-center py-20 text-white/50 animate-pulse">
                    Scanning archives...
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-400 bg-red-400/10 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && filteredMovies.length === 0 && (
                <div className="text-center py-24 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center space-y-4">
                    <div className="text-4xl">🔭</div>
                    <div className="text-xl text-white font-bold">No titles found</div>
                    <p className="text-white/50">
                        We couldn't find any movies matching <span className="text-white">"{displayTitle}"</span>.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 text-accent hover:text-white transition-colors text-sm uppercase tracking-wider font-bold"
                    >
                        Go Back
                    </button>
                </div>
            )}

            {/* Grid */}
            {!loading && !error && filteredMovies.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 animate-fade-in-up">
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
            )}

            {/* Results Count */}
            {!loading && !error && filteredMovies.length > 0 && (
                <div className="mt-12 text-center text-white/30 text-sm uppercase tracking-widest">
                    Showing {filteredMovies.length} results
                </div>
            )}
        </div>
    );
};
