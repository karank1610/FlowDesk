import { useEffect, useState } from "react";
import Kanbanboard from "./components/Kanbanboard";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import StatsBar from "./components/StateBar";
import axiosInstance from "./lib/axios";

const Dashboard = () => {
    const { user } = useAuth();
    const [activeFilter, setActiveFilter] = useState("all");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get("/tasks");
                setTasks(res.data.tasks);
            } catch (error) {
                console.log(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, []);

    return (
        <>
            <div className="dashboard-main flex h-screen bg-[#f5f3ff] font-poppins">
                <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                <div className="main-content flex-1 overflow-auto p-8">
                    <div className="welcome-header mb-8">
                        <h1 className="text-3xl font-bold text-[#2d1b69]">
                            Good Morning, {user?.name}!
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Here's what's on your plate today.
                        </p>
                    </div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <StatsBar tasks={tasks} />
                            <Kanbanboard
                                activeFilter={activeFilter}
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard;