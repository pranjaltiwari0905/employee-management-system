import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AuthContext } from '../../context/AuthProvider'

const COLORS = ['#3b82f6', '#eab308', '#22c55e', '#ef4444']

const AnalyticsChart = () => {
    const [userData] = useContext(AuthContext)
    if (!userData) return null

    const totals = userData.reduce((acc, emp) => {
        acc.newTask += emp.taskCounts.newTask
        acc.active += emp.taskCounts.active
        acc.completed += emp.taskCounts.completed
        acc.failed += emp.taskCounts.failed
        return acc
    }, { newTask: 0, active: 0, completed: 0, failed: 0 })

    const chartData = [
        { name: 'New', value: totals.newTask },
        { name: 'Active', value: totals.active },
        { name: 'Completed', value: totals.completed },
        { name: 'Failed', value: totals.failed },
    ]
    const hasData = chartData.some((d) => d.value > 0)

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-lg font-medium mb-3'>Task Overview (All Employees)</h2>
            {!hasData ? <p className='text-gray-400 text-sm'>Abhi koi task data nahi hai</p> : (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default AnalyticsChart