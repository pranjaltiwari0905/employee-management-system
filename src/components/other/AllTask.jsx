import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../../context/ToastContext'

const AllTask = () => {
    const [userData, , , , , removeEmployee] = useContext(AuthContext)
    const { showToast } = useToast()
    const [searchTerm, setSearchTerm] = useState('')

    const handleRemove = (id, name) => {
        const confirmDelete = window.confirm(`Kya aap "${name}" ko remove karna chahte ho?`)
        if (confirmDelete) {
            removeEmployee(id)
            showToast(`${name} remove kar diya gaya`, "success")
        }
    }

    const filteredData = userData
        ? userData.filter((elem) => elem.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
        : []

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <div className='flex justify-between items-center mb-3'>
                <h2 className='text-lg font-medium'>Employees</h2>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search employee by name...'
                    className='text-sm py-1.5 px-3 rounded outline-none bg-transparent border-[1px] border-gray-400 w-64' />
            </div>
            <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg font-medium w-1/5'>New Task</h3>
                <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
                <h5 className='text-lg font-medium w-1/5'>Completed</h5>
                <h5 className='text-lg font-medium w-1/5'>Failed</h5>
                <h5 className='text-lg font-medium w-1/5 text-right'>Action</h5>
            </div>
            <div>
                {filteredData.length === 0 && <p className='text-gray-400 text-sm py-4 text-center'>Koi employee nahi mila</p>}
                {filteredData.map(function (elem, idx) {
                    return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded items-center'>
                        <h2 className='text-lg font-medium w-1/5'>{elem.firstName}</h2>
                        <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
                        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
                        <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
                        <div className='w-1/5 text-right'>
                            <button onClick={() => handleRemove(elem.id, elem.firstName)} className='bg-red-600 hover:bg-red-700 text-xs py-1 px-3 rounded'>Remove</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default AllTask