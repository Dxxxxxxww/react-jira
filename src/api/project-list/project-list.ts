import { useHttp } from '../../utils/http';
import { useAsync } from '../../utils/use-async';
import { cleanObject, useDebounce } from '../../utils';
import { useEffect } from 'react';
import { Project } from '../../types';

interface ProjectListResult {
    projectList: Project[];
}

export const useProjectList = (params?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<ProjectListResult>();
    const debouncedParam = useDebounce(params, 200);
    // useEffect 的回调参数不能加上 async
    useEffect(() => {
        const fetch = () =>
            client(`projects`, { data: cleanObject(params ?? {}) });
        run(fetch(), { retry: fetch });
    }, [debouncedParam]);

    return result;
};

export const useEditProject = () => {
    const client = useHttp();
    const { run, ...asyncResult } = useAsync();
    const mutate = (params: Partial<Project>) => {
        run(client('projects/edit', { data: params, method: 'PATCH' }));
    };

    return { mutate, asyncResult };
};

export const useAddProject = () => {
    const client = useHttp();
    const { run, ...asyncResult } = useAsync();
    const mutate = (params: Partial<Project>) => {
        run(client('projects/add', { data: params, method: 'POST' }));
    };

    return { mutate, asyncResult };
};
