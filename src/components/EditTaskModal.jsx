import { useRef } from "react";
import axiosInstance from "../lib/axios";

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {

    const taskRef = {
        title: useRef(null),
        description: useRef(null),
        priority: useRef(null),
        dueDate: useRef(null),
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = taskRef.title.current.value;
        const description = taskRef.description.current.value;
        const priority = taskRef.priority.current.value;
        const dueDate = taskRef.dueDate.current.value;

        try {
            const res = await axiosInstance.put(`/tasks/${task._id}`, {
                title,
                description,
                priority,
                dueDate,
            });
            onTaskUpdated(res.data.task);
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="edit-task-main fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="edit-task-content bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <div className="edit-task-header flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#2d1b69]">Edit Task</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="edit-task-form">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <input
                            ref={taskRef.title}
                            type="text"
                            defaultValue={task.title}
                            placeholder="Task title"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400"
                            required
                        />

                        <textarea
                            ref={taskRef.description}
                            defaultValue={task.description}
                            placeholder="Description (optional)"
                            rows={3}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400 resize-none"
                        />

                        <div className="flex gap-3">
                            <select
                                ref={taskRef.priority}
                                defaultValue={task.priority}
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400"
                            >
                                <option value="low">🟢 Low</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="high">🔴 High</option>
                            </select>

                            <input
                                ref={taskRef.dueDate}
                                type="date"
                                defaultValue={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ""}
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400"
                            />
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-all cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditTaskModal;