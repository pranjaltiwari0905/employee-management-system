import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import AddEmployee from '../other/AddEmployee'
import AnalyticsChart from '../other/AnalyticsChart'
import ThemeToggle from '../other/ThemeToggle'

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7 overflow-y-auto' style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className='flex justify-end mb-2'>
                <ThemeToggle />
            </div>
            <Header changeUser={props.changeUser} />
            <AnalyticsChart />
            <AddEmployee />
            <CreateTask />
            <AllTask />
        </div>
    )
}

export default AdminDashboard