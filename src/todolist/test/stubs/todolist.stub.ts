import { TodoList } from '../../schemas/todo.schemas';

export const todoStub = (): TodoList => {
    return {
        id:"64f73d05ee1020234f723276",
        title: "first title",
        dueDate: "12:12:2023",
        occurance: "Weekly",
        category: "Personal",
        reminder: false
    }
}