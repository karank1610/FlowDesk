const StatsBar = ({ tasks }) => {

    const stats = [
        {
            label: "Total Tasks",
            count: tasks.length,
            icon: "📋",
            color: "bg-purple-100 text-purple-600",
            border: "border-purple-200"
        },
        {
            label: "In Progress",
            count: tasks.filter(t => t.status === "inprogress").length,
            icon: "⚡",
            color: "bg-yellow-100 text-yellow-600",
            border: "border-yellow-200"
        },
        {
            label: "Completed",
            count: tasks.filter(t => t.status === "done").length,
            icon: "✅",
            color: "bg-green-100 text-green-600",
            border: "border-green-200"
        },
        {
            label: "High Priority",
            count: tasks.filter(t => t.priority === "high").length,
            icon: "🔴",
            color: "bg-red-100 text-red-600",
            border: "border-red-200"
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`bg-white rounded-2xl p-5 flex items-center gap-4 border ${stat.border} shadow-sm`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#2D1B69]">{stat.count}</p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsBar;