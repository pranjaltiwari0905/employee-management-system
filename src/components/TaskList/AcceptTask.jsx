import React from 'react'
import { isOverdue, priorityColor } from '../../utils/dateHelper'

const AcceptTask = ({ data, onComplete, onFail }) => {
    const overdue = isOverdue(data.taskDate, false)
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <div className='flex gap-2 mt-2'>
                {data.priority && <span className={`text-xs px-2 py-0.5 rounded text-white ${priorityColor(data.priority)}`}>{data.priority}</span>}
                {overdue && <span className='text-xs px-2 py-0.5 rounded bg-black text-red-400 border border-red-400'>Overdue</span>}
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='flex justify-between mt-6'>
                <button onClick={onComplete} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>Mark as Completed</button>
                <button onClick={onFail} className='bg-red-500 rounded font-medium py-1 px-2 text-xs'>Mark as Failed</button>
            </div>
        </div>
    )
}

export default AcceptTask