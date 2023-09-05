import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FilterQuery } from "mongoose";
import { TodoList } from "../schemas/todo.schemas";
import { TodolistRepository } from "../todo.repository";
import { todoStub } from "./stubs/todolist.stub";
import { TodoModel } from "./support/todoitem.model";

describe('UsersRepository', () => {
    let todoListRepository: TodolistRepository;
  
    describe('find operations', () => {
      let todoModel: TodoModel;
      let userFilterQuery: FilterQuery<TodoList>;
  
      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            TodolistRepository,
            {
              provide: getModelToken(TodoList.name),
              useClass: TodoModel
            }
          ]
        }).compile();
  
        todoListRepository = moduleRef.get<TodolistRepository>(TodolistRepository);
        todoModel = moduleRef.get<TodoModel>(getModelToken(TodoList.name));
  
        userFilterQuery = {
          id: todoStub().id
        }
  
        jest.clearAllMocks();
      })
  
      describe('findOne', () => {
        describe('when findOne is called', () => {
          let todoList: TodoList;
  
          beforeEach(async () => {
            jest.spyOn(todoModel, 'findOne');
            todoList = await todoListRepository.findOne(userFilterQuery);
          })
  
          test('then it should call the todoModel', () => {
            expect(todoModel.findOne).toHaveBeenCalledWith(userFilterQuery, { _id: 0, __v: 0 });
          })
  
          test('then it should return a todoList', () => {
            expect(todoList).toEqual(todoStub());
          })
        })
      })
  
      describe('find', () => {
        describe('when find is called', () => {
          let todoList: TodoList[];
  
          beforeEach(async () => {
            jest.spyOn(todoModel, 'find');
            todoList = await todoListRepository.find(userFilterQuery);
          })
  
          test('then it should call the userModel', () => {
            expect(todoModel.find).toHaveBeenCalledWith(userFilterQuery);
          })
  
          test('then it should return a todoList', () => {
            expect(todoModel).toEqual(todoModel);
          })
        })
      })
  
      describe('findOneAndUpdate', () => {
        describe('when findOneAndUpdate is called', () => {
          let todoList: TodoList;
  
          beforeEach(async () => {
            jest.spyOn(todoModel, 'findOneAndUpdate');
            todoList = await todoListRepository.findOneAndUpdate(userFilterQuery, todoStub());
          })
  
          test('then it should call the todoModel', () => {
            expect(todoModel.findOneAndUpdate).toHaveBeenCalledWith(userFilterQuery, todoStub(), { new: true });
          })
  
          test('then it should return a todoList', () => {
            expect(todoList).toEqual(todoStub());
          })
        })
      })
   })
  
    describe('create operations', () => {
      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          providers: [
            TodolistRepository,
            {
              provide: getModelToken(TodoList.name),
              useValue: TodoModel,
            },
          ],
        }).compile();
  
        todoListRepository = moduleRef.get<TodolistRepository>(TodolistRepository);
      });
  
      describe('create', () => {
        describe('when create is called', () => {
          let todoItem: TodoList;
          let saveSpy: jest.SpyInstance;
          let constructorSpy: jest.SpyInstance;
  
          beforeEach(async () => {
            saveSpy = jest.spyOn(TodoModel.prototype, 'save');
            constructorSpy = jest.spyOn(TodoModel.prototype, 'constructorSpy');
            todoItem = await todoListRepository.create(todoStub());
          })
  
          test('then it should call the userModel', () => {
            expect(saveSpy).toHaveBeenCalled();
            expect(constructorSpy).toHaveBeenCalledWith(todoStub())
          })
  
          test('then it should return a user', () => {
            expect(todoItem).toEqual(todoStub());
          })
        })
      })
    })
  })