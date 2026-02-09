export const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
        <p>Loading upcoming movies...</p>
    </div>
);
