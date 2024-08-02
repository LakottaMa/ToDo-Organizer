import { Timestamp } from '@angular/fire/firestore';

export class Todo {
    id: string;
    title: string;
    description: string;
    created: Date | null;
    updated: Date | null;
    dueDate: Date | null;
    completed: Date | null;
    priority: 'low' | 'medium' | 'high';
    category: 'private' | 'study' | 'work';
    status: 'pending' | 'in progress' | 'done';

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.created = obj ? this.convertTimestampToDate(obj.created) : null;
        this.updated = obj ? this.convertTimestampToDate(obj.updated) : null;
        this.dueDate = obj ? this.convertTimestampToDate(obj.dueDate) : null;
        this.completed = obj ? this.convertTimestampToDate(obj.completed) : null;

        this.priority = obj ? obj.priority : 'low';
        this.category = obj ? obj.category : 'private';
        this.status = obj ? obj.status : 'pending';
    }

    private convertTimestampToDate(timestamp: any): Date | null {
        if (timestamp instanceof Timestamp) {
          return timestamp.toDate();
        }
        return null;
      }

    private convertDateToTimestamp(date: Date | null): Timestamp | null {
        return date ? Timestamp.fromDate(date) : null;
    }

    public toJson() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            created: this.convertDateToTimestamp(this.created),
            updated: this.convertDateToTimestamp(this.updated),
            dueDate: this.convertDateToTimestamp(this.dueDate),
            completed: this.convertDateToTimestamp(this.completed),
            priority: this.priority,
            category: this.category,
            status: this.status,
        };
    }
}
