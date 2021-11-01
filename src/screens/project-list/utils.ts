import { useUrlQueryParam } from '../../utils'

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const open = () => setProjectCreate({ projectCreate: true })
    // 赋值 undefined 可以通过 cleanObject 让字段不出现在 url 当中
    const close = () => setProjectCreate({ projectCreate: undefined })

    return {
        // 从 url 中取出的都是字符串，所以这里使用 'true' 来判断
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}
