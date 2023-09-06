import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from './schema/register.schema';
import { EntityRepository } from '../Database/EntityRepository';

@Injectable()
export class AuthRepository extends EntityRepository<UserDocument>{
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
        super(userModel)
    }
}
