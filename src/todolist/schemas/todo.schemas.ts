import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TodoDocument = TodoList & Document;


@Schema()
export class TodoList {
    @Prop()
    id: string;
    @Prop()
    title: string;

    @Prop()
    dueDate: string;

    @Prop()
    occurance: string;

    @Prop()
    category: string;

    @Prop()
    reminder: boolean;

}
export const TodoListSchema = SchemaFactory.createForClass(TodoList);