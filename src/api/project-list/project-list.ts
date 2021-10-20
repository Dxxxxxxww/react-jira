import { useHttp } from '../../utils/http'
import { useAsync } from '../../utils/use-async'
import { cleanObject, useDebounce } from '../../utils'
import { useCallback, useEffect } from 'react'
import { Project } from '../../types'

interface ProjectsResult {
    projectList: Project[]
}

export const useProjectList = (params?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<ProjectsResult>()
    const debouncedParam = useDebounce(params, 200)
    const fetchProject = useCallback(
        () => client(`projects`, { data: cleanObject(params ?? {}) }),
        [params, client]
    )

    // useEffect 的回调参数不能加上 async
    useEffect(() => {
        run(fetchProject(), { retry: fetchProject })
    }, [debouncedParam, fetchProject, run])

    return result
}

export const useEditProject = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) =>
        run(client('projects/edit', { data: params, method: 'PATCH' }))

    return { mutate, asyncResult }
}

export const useAddProject = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        run(client('projects/add', { data: params, method: 'POST' }))
    }

    return { mutate, asyncResult }
}
