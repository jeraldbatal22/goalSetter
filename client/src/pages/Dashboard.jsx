import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormGoal from "../components/FormGoal"

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])
  return (
    <>
      <FormGoal />
    </>
  )
}

export default Dashboard