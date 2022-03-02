import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteRequest, getRequest, postRequest } from '../../helpers/axiosApi'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const goalsListAsync = createAsyncThunk('goals/goals', async (payload, { rejectWithValue }) => {
  try {
    const data = await getRequest('goals', true)
    return data
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return rejectWithValue(message)
  }
})

export const createGoalAsync = createAsyncThunk('goals/create', async (payload, { rejectWithValue }) => {
  try {
    const data = await postRequest('goals', payload, true)
    console.log(data)
    console.log(payload)
    return data
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    console.log(message)
    return rejectWithValue(message)
  }
})

export const deleteGoalAsync = createAsyncThunk('goals/delete', async (payload, { rejectWithValue }) => {
  try {
    const data = await deleteRequest(`goals/${payload}`, true)
    console.log(data)
    console.log(payload)
    return data
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    console.log(message)
    return rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetGoals: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    resetGoalsData: (state) => {
      state.goals = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(goalsListAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(goalsListAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload.goals
      })
      .addCase(goalsListAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.goals = []
      })
      .addCase(createGoalAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoalAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload.goal)
      })
      .addCase(createGoalAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoalAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoalAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const newGoals = state.goals.filter(goal => goal._id !== action.payload.id)
        state.goals = newGoals
      })
      .addCase(deleteGoalAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetGoals, resetGoalsData } = authSlice.actions

export default authSlice.reducer