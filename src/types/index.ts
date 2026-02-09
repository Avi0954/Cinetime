export interface Movie {
    id: string;
    title: string;
    poster_url: string;
    release_at: string; // ISO 8601 UTC string
    category?: 'movies' | 'tv-shows' | 'documentaries';
    platforms?: string[];
    genres?: string[];
    is_top_rated?: boolean;
}

export interface Meta {
    success: boolean;
    error?: string;
}

export interface ApiResponse<T> {
    meta: Meta;
    data: T;
}
