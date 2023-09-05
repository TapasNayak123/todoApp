 import { MockModel } from "../../../database/test/support/mock.model";
import { TodoList } from "../../schemas/todo.schemas";
import { todoStub } from "../stubs/todolist.stub";

export class TodoModel extends MockModel<TodoList> {
  protected entityStub = todoStub()
}