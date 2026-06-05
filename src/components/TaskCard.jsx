const TaskCard =({task}) => {
    const priorityStyles = {
        low: "bg-green-100 text-green-600",
        medium: "bg-yellow-100 text-yellow-600",
        high: "bg-red-100 text-red-600",
    };

    return(
        <div className="taskcard-main bg-[#F5F3FF] rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-all">

            <h3 className="taskcard-title text-sm font-semibold text-[#2D1B69]">{task.title}</h3>

            {task.description && (
                <p className="text-xs text-gray-400">{task.description}</p>
            )}

            <div className="flex items-center justify-between mt-1">

                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityStyles[task.priority]}`}>
                    {task.priority}
                </span>

                {task.dueDate && (
                    <span className="text-xs text-gray-400">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}

            </div>

        </div>
    )
}

export default TaskCard;