import { AuthForm, User } from '../types'
import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './index'
import * as auth from 'auth-provider'
import { bootstrapUser } from '../context/auth-context'

interface State {
    user: User | null
}

const initialState: State = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

// thunk
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
    auth.login(form).then((user) => dispatch(setUser(user)))

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
    auth.register(form).then((user) => dispatch(setUser(user)))

export const logout = () => (dispatch: AppDispatch) =>
    auth.logout().then(() => dispatch(setUser(null)))

export const bootstrap = () => (dispatch: AppDispatch) =>
    bootstrapUser().then((user) => dispatch(setUser(user)))
