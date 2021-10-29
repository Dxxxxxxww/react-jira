import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}
// 创建一个切片对象，该对象包含 reducer，actions
export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        // 这就是 redux-toolkit 版本的 reducer 中的 action
        // 函数名就是 redux 的 action.type
        // 参数 action.payload 就是传递的参数
        openProjectModal(state) {
            // , action
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) =>
    state.projectList.projectModalOpen
