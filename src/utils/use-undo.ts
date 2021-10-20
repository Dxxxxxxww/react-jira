import { useCallback, useReducer } from 'react'
// reducer 版

const UNDO = 'undo'
const REDO = 'redo'
const SET = 'set'
const RESET = 'reset'

interface State<T> {
    past: T[]
    present: T
    future: T[]
}

interface Action<T> {
    newPresent?: T
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state
    const { newPresent, type } = action

    switch (type) {
        case UNDO: {
            if (!past.length) return state

            const currentPresent = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                present: currentPresent,
                future: [present, ...future]
            }
        }
        case REDO: {
            if (!future.length) return state

            const currentPresent = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: currentPresent,
                future: newFuture
            }
        }
        case SET: {
            if (newPresent === present) return state
            return {
                past: [...past, newPresent],
                present: newPresent,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }
        default:
            return state
    }
}

export const useUndo = <T>(initValue: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initValue,
        future: []
    } as State<T>)

    const canRedo = !!state.future.length
    const canUndo = !!state.past.length

    const set = useCallback(
        (newPresent: T) => dispatch({ newPresent, type: SET }),
        []
    )

    const reset = useCallback(
        (newPresent: T) => dispatch({ newPresent, type: RESET }),
        []
    )

    const undo = useCallback(() => dispatch({ type: UNDO }), [])

    const redo = useCallback(() => dispatch({ type: REDO }), [])

    return [state, { set, reset, undo, redo, canUndo, canRedo }]
}

// 初版
// export const useUndo = <T>(initValue: T) => {
//     const [state, setState] = useState<{
//         past: T[]
//         present: T
//         future: T[]
//     }>({
//         past: [],
//         present: initValue,
//         future: []
//     })
//
//     const canRedo = !!state.future.length
//     const canUndo = !!state.past.length
//
//     const set = useCallback((newPresent: T) => {
//         setState((currentState) => {
//             const { past, present } = currentState
//             if (newPresent === present) return currentState
//             return {
//                 past: [...past, newPresent],
//                 present: newPresent,
//                 future: []
//             }
//         })
//     }, [])
//
//     const reset = useCallback((newPresent: T) => {
//         setState(() => ({
//             past: [],
//             present: newPresent,
//             future: []
//         }))
//     }, [])
//
//     const undo = useCallback(() => {
//         setState((currentState) => {
//             const { past, present, future } = currentState
//             if (!past.length) return currentState
//
//             const currentPresent = past[past.length - 1]
//             const newPast = past.slice(0, past.length - 1)
//
//             return {
//                 past: newPast,
//                 present: currentPresent,
//                 future: [present, ...future]
//             }
//         })
//     }, [])
//
//     const redo = useCallback(() => {
//         setState((currentState) => {
//             const { past, present, future } = currentState
//             if (!future.length) return currentState
//
//             const currentPresent = future[0]
//             const newFuture = future.slice(1)
//
//             return {
//                 past: [...past, present],
//                 present: currentPresent,
//                 future: newFuture
//             }
//         })
//     }, [])
//
//     return [state, { set, reset, undo, redo, canUndo, canRedo }]
// }
