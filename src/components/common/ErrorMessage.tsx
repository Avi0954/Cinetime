interface ErrorMessageProps {
    message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong.</h3>
        <p className="text-gray-400 mb-6 max-w-md">
            {message || 'We couldn\'t load the movie data. The backend might be offline.'}
        </p>
        <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
        >
            Try Again
        </button>
    </div>
);
