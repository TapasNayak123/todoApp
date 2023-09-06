import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.user.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AppUtil } from 'src/util/app.util';

@Injectable()

export class AuthService {
    constructor(private readonly userRepo: AuthRepository,
        private jwtService: JwtService) { }

    async register(requestBody: RegisterUserDto) {
        const util = new AppUtil();
        const checkUser = await this.userRepo.findOne({ email: requestBody.email });
        const respObj: any = {};
        if (checkUser) {
            respObj.statusCode = 200
            respObj.message = "User already exists for this email !!"
        } else {
            const hashedPwd = await util.generatePasswordHash(requestBody.password);
            const addUser = await this.userRepo.create({
                name: requestBody.name,
                email: requestBody.email,
                password: hashedPwd
            })

            if (!addUser) throw new NotFoundException("Unable to add the items");

            respObj.statusCode = 200
            respObj.message = "User registered successfully !"
        }
        return respObj;


    }

    async login(requestBody: RegisterUserDto) {
        const util = new AppUtil();
        const user = await this.userRepo.findOne({ email: requestBody.email });
        if (!user) throw new UnauthorizedException('Credential error');
        const comparePassword = await util.comparePassword(requestBody.password, user.password);
        if (!comparePassword) throw new UnauthorizedException('Credential error !');
        const jwtToken = this.generateJWTToken(user.id, user.email, 'User')
        const resp = {
            "statusCode": 200,
            "message": "Login successful",
            "jwtToken": jwtToken
        }
        return resp;

    }

    generateJWTToken(userId: string, email: string, type: string) {
        return this.jwtService.sign({
            sub: userId,
            email,
            type: type
        })
    }

}