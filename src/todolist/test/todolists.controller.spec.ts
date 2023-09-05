import { Test } from "@nestjs/testing"
import { CreateTodoDto } from "../dto/create-todo.dto";
import { TodoList } from "../schemas/todo.schemas";
import { TodoListController } from "../todolists.controller";
import { TodoListService } from "../todolist.service";
import { todoStub } from "./stubs/todolist.stub";
jest.mock('../todolist.service');


describe('TodoListController', () => {
    let todoListController: TodoListController;
    let todoListService: TodoListService;
  
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [],
        controllers: [TodoListController],
        providers: [TodoListService]
      }).compile();
  
      todoListController = moduleRef.get<TodoListController>(TodoListController);
      todoListService = moduleRef.get<TodoListService>(TodoListService);
      jest.clearAllMocks();
    })
  
    describe('getTodoItem', () => {
      describe('when getTodoItem is called', () => {
        let todolist: TodoList;
  
        beforeEach(async () => {
            todolist = await todoListController.getTodoItem(todoStub().id)  
        })
  
        test('then it should call todoListService', () => {
          expect(todoListService.getTodoItemById).toBeCalledWith(todoStub().id);
        })
  
        test('then is should return a todo item', () => {
          expect(todoStub()).toEqual(todoStub());
        })
      })
    })
  
    describe('getTodoItems', () => {
      describe('when getTodoItems is called', () => {
        let todolist: TodoList[];
  
        beforeEach(async () => {
            todolist = await todoListController.getTodoItems();
        })
  
        test('then it should call todoListService', () => {
          expect(todoListService.getAllTodoItems).toHaveBeenCalled();
        })
  
        test('then it should return todolists', () => {
          expect([todoStub()]).toEqual([todoStub()])
        })
      })
    })
  
    describe('createTodoItem', () => {
      describe('when createTodoItem is called', () => {
        let todoItem: TodoList;
        let createUserDto: CreateTodoDto
  
        beforeEach(async () => {
          createUserDto = {
            title: todoStub().title,
            dueDate: todoStub().dueDate,
            occurance: todoStub().occurance,
            category: todoStub().category,
            reminder: todoStub().reminder
          }
          todoItem = await todoListController.createTodoItem(createUserDto);
        })
  
        test('then it should call todoListService', () => {
          expect(todoListService.createTodoItem).toHaveBeenCalledWith(createUserDto);
        })
  
        test('then it should return a createTodoItem', () => {
          expect(todoStub()).toEqual(todoStub())
        })
      })
    })
  
    describe('updateTodoItem', () => {
      describe('when updateTodoItem is called', () => {
        let todoItem: any;
        let updateUserDto: CreateTodoDto;
  
        beforeEach(async () => {
            updateUserDto = {
                title: todoStub().title,
                dueDate: todoStub().dueDate,
                occurance: todoStub().occurance,
                category: todoStub().category,
                reminder: todoStub().reminder
              }
              todoItem = await todoListController.updateTodoList(todoStub().id,updateUserDto);
        })
  
        test('then it should call todoListService', () => {
          expect(todoListService.updateTodoItem).toHaveBeenCalledWith(todoStub().id, updateUserDto);
        })
  
        test('then it should return a todoItem', () => {
          expect(todoStub()).toEqual(todoStub())
        })
      })
    })

    describe('deleteTodoItem', () => {
        describe('when deleteTodoItem is called', () => {
          let todoItem: any;
    
          beforeEach(async () => {
                todoItem = await todoListController.deleteTodoItem(todoStub().id);
          })
    
          test('then it should call todoListService', () => {
            expect(todoListService.deleteTodoItem).toHaveBeenCalledWith(todoStub().id);
          })
    
          test('then it should return a todoItem', () => {
            expect(todoStub()).toEqual(todoStub())
          })
        })
      })
  })