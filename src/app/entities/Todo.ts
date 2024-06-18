import {Status} from "./Status";

export class Todo {
    id: number;
    task: string;
    status: Status;
    date: Date;

    constructor(id: number, task: string, status: Status, date: Date) {
        this.id = id;
        this.task = task;
        this.status = status;
        this.date = date;
    }
}
