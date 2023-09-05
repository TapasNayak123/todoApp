import { todoStub } from '../test/stubs/todolist.stub';
export const UsersService = jest.fn().mockReturnValue({
    getTodoItemById: jest.fn().mockResolvedValue(todoStub()),
    getAllTodoItems: jest.fn().mockResolvedValue([todoStub()]),
    createTodoItem: jest.fn().mockResolvedValue(todoStub()),
    updateTodoItem: jest.fn().mockResolvedValue(todoStub()),
})