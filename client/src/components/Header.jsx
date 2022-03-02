import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut, reset } from '../features/auth/authSlice';
import { resetGoals, resetGoalsData } from '../features/goals/goalSlice';
import { remove, USER } from '../helpers/localStorage';
import '../styles/Header.css';

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = () => {
    remove(USER)
    dispatch(logOut())
    dispatch(reset())
    dispatch(resetGoals())
    dispatch(resetGoalsData())
    navigate('/login')
  }

  return (
    <header>
      <nav>
        <h1>GoalSetter</h1>
        <ul>
          {
            user ?
              <li onClick={logoutUser} className="logoutButton"><FaSignOutAlt /> Logout</li>
              :
              <>
                <li ><NavLink to="/login"><FaSignInAlt /> Login</NavLink></li>
                <li> <NavLink to="/register"><FaUser /> Register</NavLink></li>
              </>
          }

        </ul>
      </nav>
    </header>
  )
}

export default Header