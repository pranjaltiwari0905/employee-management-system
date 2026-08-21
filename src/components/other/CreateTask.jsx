import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../../context/ToastContext'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const { showToast } = useToast()

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!taskTitle.trim()) newErrors.taskTitle = "Task title zaroori hai"
        if (!taskDate) newErrors.taskDate = "Date select karo"
        if (!asignTo.trim()) newErrors.asignTo = "Employee ka naam do"
        else if (userData && !userData.some((e) => e.firstName.toLowerCase() === asignTo.trim().toLowerCase())) {
            newErrors.asignTo = "Ye employee exist nahi karta"
        }
        if (!category.trim()) newErrors.category = "Category zaroori hai"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!userData) return

        if (!validate()) {
            showToast("Form mein kuch fields galat hain", "error")
            return
        }

        const newTask = { taskTitle, taskDescription, taskDate, category, priority, active: false, newTask: true, failed: false, completed: false }

        const updatedData = userData.map((elem) => {
            if (asignTo.trim().toLowerCase() === elem.firstName.toLowerCase()) {
                return {
                    ...elem,
                    tasks: [...elem.tasks, newTask],
                    taskCounts: { ...elem.taskCounts, newTask: elem.taskCounts.newTask + 1 }
                }
            }
            return elem
        })

        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))
        showToast(`Task "${taskTitle}" ${asignTo} ko assign ho gaya!`, "success")

        setTaskTitle(''); setCategory(''); setAsignTo(''); setTaskDate(''); setTaskDescription(''); setPriority('Medium'); setErrors({})
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1' type="text" placeholder='Make a UI design' />
                        {errors.taskTitle && <p className='text-red-500 text-xs mb-3'>{errors.taskTitle}</p>}
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1' type="date" />
                        {errors.taskDate && <p className='text-red-500 text-xs mb-3'>{errors.taskDate}</p>}
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <input value={asignTo} onChange={(e) => setAsignTo(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1' type="text" placeholder='employee name' />
                        {errors.asignTo && <p className='text-red-500 text-xs mb-3'>{errors.asignTo}</p>}
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input value={category} onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-1' type="text" placeholder='design, dev, etc' />
                        {errors.category && <p className='text-red-500 text-xs mb-3'>{errors.category}</p>}
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Priority</h3>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-[#1c1c1c] border-[1px] border-gray-400 mb-4'>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'></textarea>
                    <button type="submit" className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask