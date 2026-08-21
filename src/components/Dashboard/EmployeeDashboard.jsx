import React from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import ThemeToggle from '../other/ThemeToggle'

const EmployeeDashboard = (props) => {
    return (
        <div className='p-10 h-screen overflow-y-auto' style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className='flex justify-end mb-2'>
                <ThemeToggle />
            </div>
            <Header changeUser={props.changeUser} data={props.data} />
            <TaskListNumbers data={props.data} />
            <TaskList data={props.data} />
        </div>
    )
}

export default EmployeeDashboard