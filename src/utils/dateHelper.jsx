export const isOverdue = (taskDate, isDone) => {
    if (!taskDate || isDone) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(taskDate)
    return due < today
}

export const priorityColor = (priority) => {
    switch (priority) {
        case 'High': return 'bg-red-600'
        case 'Medium': return 'bg-yellow-500 text-black'
        case 'Low': return 'bg-blue-500'
        default: return 'bg-gray-500'
    }
}