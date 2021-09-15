import { useHttp } from '../../utils/http';
import { useAsync } from '../../utils/use-async';
import { cleanObject, useDebounce } from '../../utils';
import { Project } from '../../screens/project-list/list';
import { useEffect } from 'react';

interface ProjectListResult {
    projectList: Project[];
}

export const useProjectList = (params?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<ProjectListResult>();
    const debouncedParam = useDebounce(params, 200);
    // useEffect 的回调参数不能加上 async
    useEffect(() => {
        run(client(`projects`, { data: cleanObject(params ?? {}) }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam]);

    return result;
};
