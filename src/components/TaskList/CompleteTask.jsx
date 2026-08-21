import React from 'react'
import { priorityColor } from '../../utils/dateHelper'

const CompleteTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            {data.priority && <span className={`text-xs px-2 py-0.5 rounded text-white inline-block mt-2 ${priorityColor(data.priority)}`}>{data.priority}</span>}
            <h2 className='mt-3 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='mt-6'>
                <button className='w-full bg-green-600 rounded font-medium py-1 px-2 text-xs'>Complete</button>
            </div>
        </div>
    )
}

export default CompleteTask