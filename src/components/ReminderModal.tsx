
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

interface ReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => Promise<boolean>;
    movieTitle: string;
}

export function ReminderModal({ isOpen, onClose, onSubmit, movieTitle }: ReminderModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Pre-fill email if available
    useEffect(() => {
        if (isOpen) {
            const savedEmail = localStorage.getItem('cine_time_user_email');
            if (savedEmail) setEmail(savedEmail);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    console.log('ReminderModal Rendering');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        const success = await onSubmit(email);
        setIsSubmitting(false);

        if (success) {
            onClose();
            // Optionally save email to local storage to pre-fill next time
            localStorage.setItem('cine_time_user_email', email);
        }
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-white mb-2">Get Notified</h2>
                <p className="text-muted text-sm mb-6">
                    Enter your email to receive a reminder when <span className="text-white font-medium">"{movieTitle}"</span> is released.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors"
                            autoFocus
                        />
                        {error && <p className="text-accent text-xs mt-2">{error}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-muted hover:text-white transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">⟳</span> Setting...
                                </>
                            ) : (
                                'Set Reminder'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
