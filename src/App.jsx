import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser.role)
      setLoggedInUserData(parsedUser.data)
    }

  }, [])

  const handleLogin = (email, password) => {
    if (email == 'pranjaltiwari0905@gmail.com' && password == '7668') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
      } else {
        alert("Invalid Credentials")
      }
    }
    else {
      alert("Invalid Credentials")
    }
  }

  const changeUser = (newRole) => {
    setUser(newRole)
    if (!newRole) {
      localStorage.removeItem('loggedInUser')
    }
  }

  // 🔑 YE NAYA HAI: har render pe fresh employee data context se nikalo,
  // taaki task accept/complete/fail hote hi UI turant update ho
  const currentEmployeeData = (user === 'employee' && userData)
    ? userData.find((e) => e.id === loggedInUserData?.id) || loggedInUserData
    : loggedInUserData

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={changeUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={changeUser} data={currentEmployeeData} /> : null)}
    </>
  )
}

export default App