export type BaseValue = string | number;

export interface User {
    name: string;
    username?: string;
    id: number;
    token: string;
}

export interface Project {
    id: number;
    projectName: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
