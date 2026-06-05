import { useState } from "react";
import axiosInstance from "../lib/axios";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task, onDelete, onUpdate }) => {

    const [editModalOpen, setEditModalOpen] = useState(false);

    const priorityStyles = {
        low: "bg-green-100 text-green-600",
        medium: "bg-yellow-100 text-yellow-600",
        high: "bg-red-100 text-red-600",
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/tasks/${task._id}`);
            onDelete(task._id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    return (
        <>
            <div className="taskcard-main bg-[#F5F3FF] rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-all">

                <div className="card-header flex items-center justify-between">
                    <h3 className="taskcard-title text-sm font-semibold text-[#2D1B69]">{task.title}</h3>
                    <div className="options flex items-center gap-2">
                        <button
                            onClick={() => setEditModalOpen(true)}
                            className="text-gray-300 hover:text-purple-500 transition-all cursor-pointer text-xs"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-300 hover:text-red-500 transition-all cursor-pointer">
                            🗑
                        </button>
                    </div>
                </div>

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
            <EditTaskModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                task={task}
                onTaskUpdated={onUpdate}
            />
        </>
    )
}

export default TaskCard;