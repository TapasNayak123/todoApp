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
// export const TodoListSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     dueDate: { type: String, required: true },
//     occurance: { type: String, required: true },
//     category: { type: String, required: true },
//     reminder: { type: Boolean, required: true }
// })


// export interface Todo extends mongoose.Document {
//     id: string;
//     title: string;
//     dueDate: string;
//     occurance: string;
//     category: string;
//     reminder: boolean;
// }