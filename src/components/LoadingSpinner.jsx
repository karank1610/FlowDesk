const LoadingSpinner = () => {
    return (
        <div className="flex-1 flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
                <p className="text-sm text-purple-400 font-medium">Loading tasks...</p>
            </div>
        </div>
    )
}

export default LoadingSpinner;