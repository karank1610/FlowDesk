import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <>
            <div className="dashboard-main flex h-screen bg-[#f5f3ff] font-poppins">
                <Sidebar />

                <div className="main-content flex-1 overflow-auto p-8">
                    <div className="welcome-header mb-8">
                        <h1 className="text-3xl font-bold text-[#2d1b69]">
                            Good Morning, {user?.name}!
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Here's what's on your plate today.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;