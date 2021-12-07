import { QueryKey, useQueryClient } from 'react-query'

export const useConfig = (
    queryKey: QueryKey,
    callback: (target: any, old?: any[]) => any[]
) => {
    const queryClient = useQueryClient()
    return {
        onSuccess() {
            queryClient.invalidateQueries(queryKey)
        },
        // —————— 以下代码是用于实现乐观更新的，如果不需要乐观更新，可以不写 ——————
        // 当 useMutation 执行时，此时接口尚未返回数据，onMutate 立即调用
        // 在真实后端数据尚未返回时，乐观更新数据。
        async onMutate(target: any) {
            // 存储原来的值
            const previousItems = queryClient.getQueryData(queryKey)
            // 乐观更新
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old)
            })
            return { previousItems }
        },
        // 当接口抛出异常时，就需要在这里回滚数据。
        onError(err: any, newItem: any, context: any) {
            queryClient.setQueryData(
                queryKey,
                (context as { previousItems: any[] }).previousItems
            )
        }
        // —————— 以上代码是用于实现乐观更新的，如果不需要乐观更新，可以不写 ——————
    }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) => old?.filter((item) => item.id !== target.id) || []
    )

export const useEditConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) =>
            old?.map((item) =>
                item.id === target.id ? { ...item, ...target } : item
            ) || []
    )

export const useAddConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]))
