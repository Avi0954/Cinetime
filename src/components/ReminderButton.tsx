
import { useState } from 'react';
import { useReminder } from '../hooks/useReminder';
import { ReminderModal } from './ReminderModal';

interface ReminderButtonProps {
    movieId: string;
    movieTitle: string;
    releaseDate: string;
    className?: string;
}

export function ReminderButton({ movieId, movieTitle, releaseDate, className = '' }: ReminderButtonProps) {
    const reminderState = useReminder({ movieId, releaseDate });
    const { status, error, setReminder } = reminderState || { status: 'idle', error: null, setReminder: () => { } };

    if (!reminderState) console.error('useReminder hook returned undefined');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        if (status === 'success' || status === 'existing') return;
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (email: string) => {
        const success = await setReminder(email);
        return success;
    };

    // Button States
    if (status === 'success' || status === 'existing') {
        return (
            <button
                disabled
                className={`flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg cursor-default font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${className}`}
            >
                <div className="flex items-center gap-2">
                    <span>Reminder Set</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </button>
        );
    }

    return (
        <>
            <button
                onClick={handleClick}
                disabled={status === 'loading'}
                className={`group relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 
                    bg-white/5 text-white/90 border border-white/10 
                    hover:bg-white hover:text-black hover:border-white 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    ${error ? 'border-red-500/50 text-red-400' : ''} 
                    ${className}`}
                title={error || ''}
            >
                {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span>Remind Me</span>
                    </>
                )}
            </button>

            <ReminderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                movieTitle={movieTitle}
            />
        </>
    );
}
