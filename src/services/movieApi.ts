export interface Movie {
    id: string;
    title: string;
    description?: string; // Backend might not send this yet, optional
    releaseDate: string;  // Mapped from release_utc
    posterUrl: string;    // Mapped from poster_url
}

interface BackendMovie {
    id: string;
    title: string;
    release_utc: string;
    poster_url: string;
    status: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    count?: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
    try {
        const response = await fetch(`${API_URL}/movies/upcoming`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const json: ApiResponse<BackendMovie[]> = await response.json();

        // Transform Backend Data (Snake Case) to Frontend Model (Camel Case)
        return json.data.map(m => ({
            id: m.id,
            title: m.title,
            description: 'A highly anticipated upcoming release.', // Default desc since backend is minimal KV
            releaseDate: m.release_utc,
            posterUrl: m.poster_url,
        }));

    } catch (error) {
        console.error('Fetch Movies Failed:', error);
        throw error;
    }
};
