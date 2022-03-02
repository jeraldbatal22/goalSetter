import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postRequest } from '../../helpers/axiosApi'
import { get, save, USER } from '../../helpers/localStorage'

// Get user from local storage 

const user = get(USER)

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const registerAsync = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await postRequest('users', payload)
    console.log(data)
    console.log(payload)
    return data
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return rejectWithValue(message)
  }
})

export const loginAsync = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await postRequest('users/login', payload)
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
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    logOut: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        save(USER, action.payload)
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        save(USER, action.payload)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})

export const { reset, logOut } = authSlice.actions

export default authSlice.reducer