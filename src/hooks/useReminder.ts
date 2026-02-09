
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

interface UseReminderProps {
    movieId: string;
    releaseDate: string; // ISO string
}

export function useReminder({ movieId, releaseDate }: UseReminderProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'existing' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    // key for local storage: 'reminders_set' -> [movieId1, movieId2, ...]
    const STORAGE_KEY = 'cine_time_reminders';

    useEffect(() => {
        // Check local storage on mount
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const ids = JSON.parse(stored);
                if (Array.isArray(ids) && ids.includes(movieId)) {
                    setStatus('existing');
                }
            }
        } catch (e) {
            console.error('Failed to parse local storage reminders', e);
        }
    }, [movieId]);

    const setReminder = async (email: string) => {
        setStatus('loading');
        setError(null);

        try {
            const response = await fetch(`${API_URL}/reminders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movie_id: movieId,
                    email: email,
                    remind_at: releaseDate
                }),
            });

            if (response.ok) {
                setStatus('success');
                saveToLocalStorage();
                return true;
            } else if (response.status === 409) {
                setStatus('existing');
                saveToLocalStorage(); // Ensure it's marked locally too
                return true; // Treat as success for UI
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to set reminder');
            }
        } catch (err: any) {
            setStatus('error');
            setError(err.message);
            return false;
        }
    };

    const saveToLocalStorage = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            let ids: string[] = [];
            if (stored) {
                ids = JSON.parse(stored);
            }
            if (!ids.includes(movieId)) {
                ids.push(movieId);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
            }
        } catch (e) {
            console.error('Failed to save to local storage', e);
        }
    };

    return { status, error, setReminder };
}
