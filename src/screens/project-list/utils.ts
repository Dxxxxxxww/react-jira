import { useUrlQueryParam } from '../../utils'
import { useProjectInfo } from '../../api/project-list/project-list'

export const useProjectModal = () => {
    // 从 url 中获取创建状态
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    // 从 url 中获取编辑项目的 id，获取编辑状态
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    // 通过 编辑项目的id 去请求项目详情，如果 editingProjectId 为空则不会触发请求
    const { data: editingProject, isLoading } = useProjectInfo(
        Number(editingProjectId)
    )

    const open = () => setProjectCreate({ projectCreate: true })
    // 赋值 undefined 可以通过 cleanObject 让字段不出现在 url 当中
    const close = () => {
        setProjectCreate({ projectCreate: undefined })
        setEditingProjectId({ editingProjectId: undefined })
    }
    const startEdit = (id: number) => {
        setEditingProjectId({ editingProjectId: id })
    }

    return {
        // 从 url 中取出的都是字符串，所以这里使用 'true' 来判断
        projectModalOpen: projectCreate === 'true' || !!editingProjectId,
        open,
        close,
        startEdit,
        editingProject: editingProject?.projectInfo,
        isLoading
    }
}
