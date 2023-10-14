import React, { useEffect, useState } from 'react'
import { getAllTask } from '../api/task.api'
import TaskCard from './TaskCard'
import Consulta from './Consulta'
import ConsultaIns from './ConsultaIns'

const TaskList = () => {

    const [tasks, setTasks] = useState([])

  useEffect(()=>{

    async function loadTask() {
        const res = await getAllTask()
        setTasks(res.data)
    }

    loadTask()
  })

  return (
    <div>
        {tasks.map(task =>(
            <TaskCard task={task} key={task.id}/>
        ))}

      <Consulta></Consulta>
      <ConsultaIns></ConsultaIns>
    </div>
  )
}

export default TaskList