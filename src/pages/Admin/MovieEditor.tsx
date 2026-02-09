import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminApi } from '../../hooks/useAdminApi';

export const MovieEditor: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchWithAuth } = useAdminApi();
    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // New Fields
    const [category, setCategory] = useState('movies');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [genres, setGenres] = useState('');
    const [isTopRated, setIsTopRated] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            // Fetch existing movie details
            const fetchMovie = async () => {
                try {
                    const res = await fetchWithAuth('/admin/movies');
                    const data = await res.json();
                    const movie = data.data.find((m: any) => m.id === id);

                    if (movie) {
                        setTitle(movie.title);
                        setPosterUrl(movie.poster_url || '');

                        // Convert UTC timestamp to Local Date/Time inputs
                        const localDate = new Date(movie.release_at);

                        // Format YYYY-MM-DD
                        const yyyy = localDate.getFullYear();
                        const mm = String(localDate.getMonth() + 1).padStart(2, '0');
                        const dd = String(localDate.getDate()).padStart(2, '0');
                        setDate(`${yyyy}-${mm}-${dd}`);

                        // Format HH:MM
                        const hh = String(localDate.getHours()).padStart(2, '0');
                        const min = String(localDate.getMinutes()).padStart(2, '0');
                        setTime(`${hh}:${min}`);

                        // Populate new fields
                        setCategory(movie.category || 'movies');
                        setPlatforms(movie.platforms || []);
                        setGenres((movie.genres || []).join(', '));
                        setIsTopRated(!!movie.is_top_rated);
                    }
                } catch (error) {
                    console.error("Failed to fetch movie", error);
                }
            };
            fetchMovie();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Combine Date + Time to ISO string (Local Browser Time)
            const localDateTimeString = `${date}T${time}`;
            const localDateObj = new Date(localDateTimeString);

            // Convert to strict UTC ISO string
            const release_at = localDateObj.toISOString();

            const payload = {
                title,
                poster_url: posterUrl,
                release_at,
                category,
                platforms,
                genres: genres.split(',').map(g => g.trim()).filter(Boolean),
                is_top_rated: isTopRated
            };

            const endpoint = isEditMode
                ? `/admin/movies/${id}`
                : '/admin/movies';

            const method = isEditMode ? 'PUT' : 'POST';

            const res = await fetchWithAuth(endpoint, {
                method,
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Operation failed');
            }

            navigate('/admin');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isEditMode ? 'Edit Movie' : 'Add New Movie'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                </div>

                {/* Poster URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Poster URL</label>
                    <input
                        type="url"
                        value={posterUrl}
                        onChange={e => setPosterUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                    {posterUrl && (
                        <div className="mt-2 text-xs text-gray-500">
                            Preview: <img src={posterUrl} alt="Preview" className="h-20 inline-block ml-2 rounded border" />
                        </div>
                    )}
                </div>

                {/* Release Time */}
                <div className="grid grid-cols-2 gap-4">
                    {/* ... (existing date inputs handled in separate chunk if needed, but here we insert AFTER poster URL) ... */}
                </div>



                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    >
                        <option value="movies">Movies</option>
                        <option value="tv-shows">TV Shows</option>
                        <option value="documentaries">Documentaries</option>
                    </select>
                </div>

                {/* Genres */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Genres (comma separated)</label>
                    <input
                        type="text"
                        value={genres}
                        onChange={e => setGenres(e.target.value)}
                        placeholder="Action, Sci-Fi, Drama"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                </div>

                {/* Platforms */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                    <div className="flex flex-wrap gap-3">
                        {['Netflix', 'Prime Video', 'Disney+', 'Apple TV+', 'Theatrical'].map(p => {
                            const slug = p.toLowerCase().replace(/\s+/g, '-').replace('+', '-plus'); // simple slugify
                            return (
                                <label key={p} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={platforms.includes(slug)}
                                        onChange={e => {
                                            if (e.target.checked) setPlatforms([...platforms, slug]);
                                            else setPlatforms(platforms.filter(pl => pl !== slug));
                                        }}
                                        className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{p}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Top Rated */}
                <div className="flex items-center">
                    <input
                        id="is_top_rated"
                        type="checkbox"
                        checked={isTopRated}
                        onChange={e => setIsTopRated(e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_top_rated" className="ml-2 block text-sm text-gray-900">
                        Mark as Top Rated
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Release Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Release Time (Local)</label>
                        <input
                            type="time"
                            required
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Movie'}
                    </button>
                </div>
            </form>
        </div>
    );
};
