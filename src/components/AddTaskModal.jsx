import { useRef } from "react";

const AddTaskModal = ({isOpen, onClose, status, onAddTask}) => {

    const taskRef = {
        title: useRef(null),
        description: useRef(null),
        priority: useRef(null),
        dueDate: useRef(null),
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = taskRef.title.current.value;
        const description = taskRef.description.current.value;
        const priority = taskRef.priority.current.value;
        const dueDate = taskRef.dueDate.current.value;

        if (!title) return;

        const newTask = {
            title,
            description,
            priority,
            dueDate,
            status, 
        }

        console.log("New Task:", newTask); 
        onAddTask(newTask)
        onClose();
    }

    if (!isOpen) return null;
    return (
        <>
            <div className="add-task-modal-main fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <div className="modal-header flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-[#2d1b69]">Add New Task</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl">
                            ✕
                        </button>
                    </div>

                    <div className="modal-form">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Task title" ref={taskRef.title} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400" required />

                            <textarea type="text" placeholder="Description (optional)" ref={taskRef.description} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400" />

                            <div className="flex gap-3">
                                <select ref={taskRef.priority} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400">
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🔴 High</option>
                                </select>

                                <input
                                    ref={taskRef.dueDate} type="date" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-400"
                                />
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-all cursor-pointer">
                                    Cancel
                                </button>

                                <button type="submit" className="flex-1 py-3 rounded-xl text-white text-sm bg-purple-600 font-semibold hover:bg-purple-700 transition-all cursor-pointer">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTaskModal;