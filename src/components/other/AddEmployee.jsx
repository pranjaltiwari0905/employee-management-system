import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../../context/ToastContext'

const AddEmployee = () => {
    const [, , , , addEmployee] = useContext(AuthContext)
    const { showToast } = useToast()

    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!firstName.trim()) newErrors.firstName = "Naam zaroori hai"
        const emailRegex = /^[^\s@]+@[^\s@]+(\.[^\s@]+)?$/
        if (!email.trim()) newErrors.email = "Email zaroori hai"
        else if (!emailRegex.test(email)) newErrors.email = "Email format sahi nahi hai"
        if (!password.trim()) newErrors.password = "Password zaroori hai"
        else if (password.length < 3) newErrors.password = "Password kam se kam 3 characters ka ho"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!validate()) {
            showToast("Form mein kuch fields galat hain", "error")
            return
        }
        const result = addEmployee(firstName.trim(), email.trim(), password)
        if (result.success) {
            showToast(result.message, "success")
            setFirstName(''); setEmail(''); setPassword(''); setErrors({})
        } else {
            showToast(result.message, "error")
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <h2 className='text-lg font-medium mb-3'>Add New Employee</h2>
            <form onSubmit={submitHandler} className='flex flex-wrap gap-4 items-start'>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Name</h3>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400' type="text" placeholder='Employee name' />
                    {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
                </div>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Email</h3>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400' type="text" placeholder='employee@example.com' />
                    {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                </div>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Password</h3>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400' type="text" placeholder='password' />
                    {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
                </div>
                <button type="submit" className='bg-emerald-500 hover:bg-emerald-600 py-2 px-5 rounded text-sm mt-5'>Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee