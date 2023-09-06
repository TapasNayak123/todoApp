import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from './schema/register.schema';
import {AuthRepository} from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategy/jwt-strategy';
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
            JwtModule.register({secret:'super-secret'})],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, JWTStrategy]
})

export class AuthModule { };