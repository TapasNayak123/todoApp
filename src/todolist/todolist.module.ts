import { Module } from "@nestjs/common";
import { TodoListService } from "./todolist.service";
import { TodoListController } from "./todolists.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoListSchema, TodoList } from './schemas/todo.schemas';
import { TodolistRepository } from './todo.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }])],
    controllers: [TodoListController],
    providers: [TodoListService, TodolistRepository]
})


export class TodoModule { }