import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(null)
    const [adminData, setAdminData] = useState(null)

    useEffect(() => {
        const existing = getLocalStorage()

        if (!existing.employees || !existing.admin) {
            setLocalStorage()
        }

        const { employees, admin } = getLocalStorage()
        setUserData(employees)
        setAdminData(admin)
    }, [])

    const updateTaskStatus = (employeeId, taskIndex, newStatus) => {
        const updatedData = userData.map((elem) => {
            if (elem.id === employeeId) {
                const updatedTasks = elem.tasks.map((task, idx) => {
                    if (idx === taskIndex) {
                        return {
                            ...task,
                            newTask: false,
                            active: newStatus === 'active',
                            completed: newStatus === 'completed',
                            failed: newStatus === 'failed'
                        }
                    }
                    return task
                })

                const updatedCounts = { ...elem.taskCounts }
                if (newStatus === 'active') {
                    updatedCounts.newTask = Math.max(0, updatedCounts.newTask - 1)
                    updatedCounts.active = updatedCounts.active + 1
                } else if (newStatus === 'completed') {
                    updatedCounts.active = Math.max(0, updatedCounts.active - 1)
                    updatedCounts.completed = updatedCounts.completed + 1
                } else if (newStatus === 'failed') {
                    updatedCounts.active = Math.max(0, updatedCounts.active - 1)
                    updatedCounts.failed = updatedCounts.failed + 1
                }

                return { ...elem, tasks: updatedTasks, taskCounts: updatedCounts }
            }
            return elem
        })

        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))
    }

    const addEmployee = (firstName, email, password) => {
        if (!userData) return { success: false, message: "Data load ho raha hai, thoda ruko" }

        const alreadyExists = userData.some((emp) => emp.email === email)
        if (alreadyExists) {
            return { success: false, message: "email is already registered" }
        }

        const newId = userData.length > 0
            ? Math.max(...userData.map((emp) => emp.id)) + 1
            : 1

        const newEmployee = {
            id: newId,
            firstName,
            email,
            password,
            taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 },
            tasks: []
        }

        const updatedData = [...userData, newEmployee]
        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))

        return { success: true, message: "Employee add ho gaya!" }
    }

    const removeEmployee = (employeeId) => {
        if (!userData) return

        const updatedData = userData.filter((emp) => emp.id !== employeeId)
        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))
    }

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData, updateTaskStatus, adminData, addEmployee, removeEmployee]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider