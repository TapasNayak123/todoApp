import { Injectable, NotFoundException } from "@nestjs/common";
import { TodolistRepository } from './todo.repository';
import { TodoList } from './schemas/todo.schemas';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoListService {
    constructor(private readonly todoItemModel: TodolistRepository) { }

    async createTodoItem(requestBody: CreateTodoDto) {
        return await this.todoItemModel.create({
            title: requestBody.title,
            dueDate: requestBody.dueDate,
            occurance: requestBody.occurance,
            category: requestBody.category,
            reminder: requestBody.reminder
        })

    }

    async getAllTodoItems(): Promise<TodoList[]> {
        return await this.todoItemModel.find({})
    }

    async getTodoItemById(id: string): Promise<TodoList> {
        try {
            const item = await this.todoItemModel.findOne({ _id: id });
            if (!item) throw new NotFoundException('Could not find items')
            return item
        } catch (error) {
            throw new NotFoundException('Could not find items')
        }

    }

    async updateTodoItem(id: string, requestBody: CreateTodoDto) {
        try {
            return await this.todoItemModel.findOneAndUpdate({ _id: id }, requestBody).then((result: CreateTodoDto) => {
                return result;

            }).catch(error => {
                throw new NotFoundException('Could not find items')
            });

        } catch (error) {
            throw new NotFoundException('Could not find items')
        }

    }

    async deleteTodoItem(todoItemId: string) {
        const deletTodoItems = await this.todoItemModel.deleteOne({ _id: todoItemId });
        return deletTodoItems;
    }

}
