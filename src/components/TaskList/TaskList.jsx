import React, { useContext, useState } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = ({ data }) => {
    const [, , updateTaskStatus] = useContext(AuthContext)
    const [filter, setFilter] = useState('all')
    const filters = ['all', 'new', 'active', 'completed', 'failed']

    const passesFilter = (elem) => {
        if (filter === 'all') return true
        if (filter === 'new') return elem.newTask
        if (filter === 'active') return elem.active
        if (filter === 'completed') return elem.completed
        if (filter === 'failed') return elem.failed
        return true
    }

    return (
        <div>
            <div className='flex gap-2 mt-8'>
                {filters.map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`text-xs px-3 py-1.5 rounded capitalize ${filter === f ? 'bg-emerald-500' : 'bg-[#2a2a2a] text-gray-300'}`}>
                        {f}
                    </button>
                ))}
            </div>
            <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-5'>
                {data.tasks.map((elem, idx) => {
                    if (!passesFilter(elem)) return null
                    if (elem.active) return <AcceptTask key={idx} data={elem} onComplete={() => updateTaskStatus(data.id, idx, 'completed')} onFail={() => updateTaskStatus(data.id, idx, 'failed')} />
                    if (elem.newTask) return <NewTask key={idx} data={elem} onAccept={() => updateTaskStatus(data.id, idx, 'active')} />
                    if (elem.completed) return <CompleteTask key={idx} data={elem} />
                    if (elem.failed) return <FailedTask key={idx} data={elem} />
                    return null
                })}
            </div>
        </div>
    )
}

export default TaskList