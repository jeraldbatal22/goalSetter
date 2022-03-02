import '../styles/GoalsList.css';
import { FaTimes } from 'react-icons/fa'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGoalAsync, goalsListAsync, resetGoals } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';

const GoalsList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(goalsListAsync())
  }, [dispatch])

  const { goals, message, isError } = useSelector((state) => state.goals)

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }
  //   // if (user || isSuccess) {
  //   //   navigate('/')
  //   // }
  //   dispatch(resetGoals())
  // }, [message, isError, dispatch])

  const deleteGoal = (id) => {
    dispatch(deleteGoalAsync(id))
    if (isError) {
      toast.error(message)
    }
    // if (user || isSuccess) {
    //   navigate('/')
    // }
    dispatch(resetGoals())
    console.log(id)
  }

  return (
    <section className='goals_list_section'>
      {!goals.length > 0 && <p>Empty goals. Add now.</p>}
      {
        goals && goals.length > 0 && goals.map((goal, index) => (
          <div key={index}>
            <i onClick={() => deleteGoal(goal._id)}><FaTimes /></i>
            <p>{new Date(goal.createdAt).toLocaleString()}</p>
            {/* <p>{goal.createdAt}</p> */}
            <h3>{goal.text}</h3>
          </div>
        ))
      }
    </section>
  )
}

export default GoalsList