import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TodoModule} from './todolist/todolist.module';

@Module({
  imports: [TodoModule, MongooseModule.forRoot(
                'mongodb+srv://TempUser:StPIce0w0Z1CwINj@cluster0.mnealvg.mongodb.net/todo-app?retryWrites=true&w=majority'
                )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
