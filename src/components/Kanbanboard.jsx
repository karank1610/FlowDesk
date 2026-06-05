import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import axiosInstance from "../lib/axios";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const Kanbanboard = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState(null);
    const [tasks, setTasks] = useState([]);

    const columns = [
        { id: "todo", label: "To Do", color: "border-blue-400", badgeColor: "bg-blue-100 text-blue-600" },
        { id: "inprogress", label: "In Progress", color: "border-yellow-400", badgeColor: "bg-yellow-100 text-yellow-600" },
        { id: "done", label: "Done", color: "border-green-400", badgeColor: "bg-green-100 text-green-600" },
    ];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get("/tasks");
                setTasks(res.data.tasks);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchTasks();
    }, []);

    const handleAddTask = (columnId) => {
        setActiveColumn(columnId);
        setModalOpen(true);
    }

    const handleNewTask = (task) => {
        setTasks([...tasks, task]);
    }

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    }

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
        ));
    }

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId) return;

        setTasks(tasks.map(task =>
            task._id === draggableId
                ? { ...task, status: destination.droppableId }
                : task
        ));

        try {
            await axiosInstance.put(`/tasks/${draggableId}`, {
                status: destination.droppableId
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanbanboard-main flex gap-6">
                    {columns.map((column) => (
                        <Droppable droppableId={column.id} key={column.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`kanban-column flex-1 bg-white rounded-2xl shadow-sm border-t-4 ${column.color} p-5`}
                                >
                                    <div className="column-header flex items-center justify-between mb-4">
                                        <h2 className="font-semibold text-[#2d1b69]">{column.label}</h2>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${column.badgeColor}`}>
                                            {tasks.filter(task => task.status === column.id).length}
                                        </span>
                                    </div>

                                    <div className="tasks-main flex flex-col gap-3">
                                        {tasks
                                            .filter(task => task.status === column.id)
                                            .map((task, index) => (
                                                <TaskCard
                                                    key={task._id}
                                                    task={task}
                                                    index={index}
                                                    onDelete={handleDeleteTask}
                                                    onUpdate={handleUpdateTask}
                                                />
                                            ))
                                        }
                                    </div>

                                    {provided.placeholder}

                                    <button onClick={() => handleAddTask(column.id)}
                                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-gray-400 hover:text-purple-600 transition-all cursor-pointer"
                                    >
                                        <span>+</span>
                                        <span>Add Task</span>
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <AddTaskModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                status={activeColumn}
                onAddTask={handleNewTask}
            />
        </>
    )
}

export default Kanbanboard;