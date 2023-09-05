import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodoList, TodoDocument } from './schemas/todo.schemas';
import { EntityRepository } from '../Database/EntityRepository';

@Injectable()
export class TodolistRepository extends EntityRepository<TodoDocument>{
    constructor(@InjectModel(TodoList.name) todoModel: Model<TodoDocument>) {
        super(todoModel)
    }
}
