import { Controller, Post, Body,HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto'


@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('/signup')
    async register(@Body() registerBody: RegisterUserDto) {
        return await this.authService.register(registerBody)

    }
    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    async login(@Body() loginBody: RegisterUserDto) {
        return await this.authService.login(loginBody);

    }


}