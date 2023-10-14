import React from 'react'
import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask ,getTask} from '../api/task.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'

const TaskFormPage = () => {

  const {register, handleSubmit, formState:{errors},setValue} = useForm()
  const navigate = useNavigate() 
  const params = useParams()

  const onSubmit = handleSubmit(async data => {
    if (params.id){
    await updateTask(params.id,data)
    navigate('/tasks')
    }else{
    await createTask(data)
    toast.success('tarea creada',{
      position:'bottom-center'
    })
    navigate('/tasks')

    }
  })

  useEffect(()=>{

    async function loadTask(){
      if (params.id){
        const {data} = await getTask(params.id)
        setValue('title',data.title)
        setValue('description',data.description)
      }
    }
    loadTask()
    
  },[])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='title' {...register('title',{required:true})}/>
        {errors.title && <span>this is field is required</span>}
        <textarea rows="3" {...register('description',{required:true})}></textarea>
        {errors.description && <span>this is field is required</span>}
        <button>SAVE</button>
      </form>
      {params.id && <button
      onClick={async()=>{
        const answer = window.confirm('are you sure?')
        if (answer){
          await deleteTask(params.id)
          navigate('/tasks')
        }
      }}
      >DELETE</button>}
    </div>
  )
}

export default TaskFormPage