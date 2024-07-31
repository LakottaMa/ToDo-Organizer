export interface Todo {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    category: 'private' | 'study' | 'work';
    status: 'pending' | 'in progress' | 'done';
}