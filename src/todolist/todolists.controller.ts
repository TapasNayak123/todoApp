
import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { TodoListService } from "./todolist.service";
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoList } from './schemas/todo.schemas';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoListController {

    constructor(private readonly todolistService: TodoListService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createTodoItem(@Body() todoListDto: CreateTodoDto): Promise<TodoList> {
        return await this.todolistService.createTodoItem(todoListDto);
        // const response = {
        //   "status":"success",
        //   "message":"Item added successfully !!",
        //   "id":addItems.id
        // }
        // return response;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/getTodoItems')
    async getTodoItems(): Promise<TodoList[]> {
        return await this.todolistService.getAllTodoItems();

    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/getTodoItem/:id')
    async getTodoItem(@Param('id') todoItemId: string): Promise<TodoList> {
        return await this.todolistService.getTodoItemById(todoItemId)
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/updateTodo/:id')
    async updateTodoList(@Param('id') todoItemId: string, @Body() body: CreateTodoDto): Promise<CreateTodoDto> {
        return await this.todolistService.updateTodoItem(todoItemId, body)

    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('/deleteTodo/:id')
    async deleteTodoItem(@Param('id') todoItemId: string) {
        return await this.todolistService.deleteTodoItem(todoItemId)
    }



}

