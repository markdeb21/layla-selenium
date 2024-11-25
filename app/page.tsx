'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()])
      setNewTask('')
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-sans">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow mr-2"
            data-testid="new-task-input"
          />
          <Button onClick={addTask} data-testid="add-task-button">Add Task</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span data-testid={`task-${index}`}>{task}</span>
              <Button 
                onClick={() => removeTask(index)} 
                variant="destructive"
                data-testid={`remove-task-${index}`}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
