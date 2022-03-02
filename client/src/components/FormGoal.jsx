import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createGoalAsync, resetGoals } from '../features/goals/goalSlice'
import GoalsList from './GoalsList'

const FormGoal = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // if (user || isSuccess) {
    //   navigate('/')
    // }
    dispatch(resetGoals())
  }, [message, isError, dispatch])


  const onInputChange = (e) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    const formData = {
      text: text
    }
    setText('')
    dispatch(createGoalAsync(formData))

  }

  return (
    <div className='register'>
      <section className='register_section'>
        <h1> Welcome {user && user.name} </h1>
        <h2>Goals Dashboard</h2>
      </section>

      <section className='register_section'>
        <form onSubmit={onSubmitForm}>
          <label style={{ textAlign: 'left', fontWeight: 'bold' }}>Goal</label>
          <input name="text" onChange={onInputChange} value={text} />
          <button type='submit'>Add Goal</button>
        </form>
      </section>
      <GoalsList />
    </div>
  )
}

export default FormGoal