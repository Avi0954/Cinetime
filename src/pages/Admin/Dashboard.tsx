import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminApi } from '../../hooks/useAdminApi';

interface Movie {
    id: string;
    title: string;
    release_at: string;
}

export const AdminDashboard: FC = () => {
    const navigate = useNavigate();
    const { fetchWithAuth } = useAdminApi();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMovies = async () => {
        try {
            const res = await fetchWithAuth('/admin/movies');
            const data = await res.json();
            if (data.meta.success) {
                setMovies(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch movies", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this movie?')) return;

        try {
            const res = await fetchWithAuth(`/admin/movies/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchMovies(); // Refresh list
            } else {
                alert('Failed to delete movie');
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading movies...</div>;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Movie Management</h3>
                <button
                    onClick={() => navigate('/admin/movies/new')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                    Add New Movie
                </button>
            </div>

            <ul className="divide-y divide-gray-200">
                {movies.map((movie) => (
                    <li key={movie.id} className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{movie.title}</p>
                                <p className="text-xs text-gray-500 flex flex-col sm:flex-row sm:gap-4 mt-1">
                                    <span>UTC: {movie.release_at}</span>
                                    <span className="text-gray-400">
                                        Local: {new Date(movie.release_at).toLocaleString()}
                                    </span>
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => navigate(`/admin/movies/${movie.id}/edit`)}
                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
                {movies.length === 0 && (
                    <li className="px-6 py-8 text-center text-gray-500 text-sm">
                        No movies found. Add one to get started.
                    </li>
                )}
            </ul>
        </div>
    );
};
