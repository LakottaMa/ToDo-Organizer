export interface Todo {
    id?: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    category: 'private' | 'study' | 'work';
    status: 'pending' | 'in progress' | 'done';
}