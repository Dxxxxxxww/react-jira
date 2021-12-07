import { useHttp } from '../../utils/http'
// import { useAsync } from '../../utils/use-async'
import { Project } from '../../types'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { cleanObject } from '../../utils'
import {
    useAddConfig,
    useDeleteConfig,
    useEditConfig
} from 'utils/use-optimistic-options'

// interface ProjectsResult {
//     projectList: Project[]
// }

// export const useProjects = (param?: Partial<Project>) => {
//     const client = useHttp()
//
//     return useQuery<Project[]>(['projects', cleanObject(param)], () =>
//         client('projects', { data: param })
//     )
// }

export const useProjectList = (params?: Partial<Project>): any => {
    const client = useHttp()
    return useQuery<any>(['projects', cleanObject(params)], () =>
        client('projects', { data: params })
    )

    // const { run, ...result } = useAsync<ProjectsResult>()
    // const debouncedParam = useDebounce(params, 200)
    // const fetchProject = useCallback(
    //     () => client(`projects`, { data: cleanObject(params ?? {}) }),
    //     [params, client]
    // )
    //
    // // useEffect 的回调参数不能加上 async
    // useEffect(() => {
    //     run(fetchProject(), { retry: fetchProject })
    // }, [debouncedParam, fetchProject, run])
    //
    // return result
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    // useQuery -- GET  useMutation -- others
    return useMutation(
        (params: Partial<Project>) =>
            client('projects/edit', { data: params, method: 'PATCH' }),
        useEditConfig(queryKey)
    )
    // useAsync
    // const { run, ...asyncResult } = useAsync()
    // const mutate = (params: Partial<Project>) =>
    //     run(client('projects/edit', { data: params, method: 'PATCH' }))

    // return { mutate, asyncResult }
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) =>
            client('projects/add', { data: params, method: 'POST' }),
        useAddConfig(queryKey)
    )
    // useAsync
    // const { run, ...asyncResult } = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //     run(client('projects/add', { data: params, method: 'POST' }))
    // }
    //
    // return { mutate, asyncResult }
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, { method: 'DELETE' }),
        useDeleteConfig(queryKey)
    )
}

export const useProjectInfo = (id?: number) => {
    const client = useHttp()
    return useQuery(
        ['project', { id }],
        () =>
            client(`project`, {
                data: {
                    id
                }
            }),
        {
            // 如果 id 不存在则不请求
            enabled: !!id
        }
    )
}
