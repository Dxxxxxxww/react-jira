import { useCallback, useState } from 'react'

export const useUndo = <T>(initValue: T) => {
    const [state, setState] = useState<{
        past: T[]
        present: T
        future: T[]
    }>({
        past: [],
        present: initValue,
        future: []
    })

    const canRedo = !!state.future.length
    const canUndo = !!state.past.length

    const set = useCallback((newPresent: T) => {
        setState((currentState) => {
            const { past, present } = currentState
            if (newPresent === present) return currentState
            return {
                past: [...past, newPresent],
                present: newPresent,
                future: []
            }
        })
    }, [])

    const reset = useCallback((newPresent: T) => {
        setState(() => ({
            past: [],
            present: newPresent,
            future: []
        }))
    }, [])

    const undo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState
            if (!past.length) return currentState

            const currentPresent = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)

            return {
                past: newPast,
                present: currentPresent,
                future: [present, ...future]
            }
        })
    }, [])

    const redo = useCallback(() => {
        setState((currentState) => {
            const { past, present, future } = currentState
            if (!future.length) return currentState

            const currentPresent = future[0]
            const newFuture = future.slice(1)

            return {
                past: [...past, present],
                present: currentPresent,
                future: newFuture
            }
        })
    }, [])

    return [state, { set, reset, undo, redo, canUndo, canRedo }]
}
