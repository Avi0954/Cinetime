export interface Movie {
    id: string;
    title: string;
    description: string;
    releaseDate: string; // ISO 8601
    posterUrl: string;
}

export const mockMovies: Movie[] = [
    {
        id: '1',
        title: 'Dune: Part Two',
        description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
        releaseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
        posterUrl: 'https://placehold.co/300x450/1a1a1a/white?text=Dune+2',
    },
    {
        id: '2',
        title: 'Future Release',
        description: 'A mysterious sci-fi thriller coming later this year.',
        releaseDate: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // 5 minutes from now
        posterUrl: 'https://placehold.co/300x450/2b2b2b/white?text=Future',
    },
    {
        id: '3',
        title: 'Already Released',
        description: 'A classic that is already available.',
        releaseDate: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        posterUrl: 'https://placehold.co/300x450/3c3c3c/white?text=Released',
    },
];
