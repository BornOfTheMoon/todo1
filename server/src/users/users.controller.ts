import {Controller, Post, Get, Body, HttpStatus, HttpCode, Res, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './login.dto/login.dto';
import { RegisterDto } from './register.dto/register.dto';
import { ResponseDto } from './response.dto/response.dto';
import { UsersDto } from './users.dto/users.dto';
import { LogoutDto } from './logout.dto/logout.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    const data = await this.usersService.create(registerDto);
    return {
      success: data.success,
      data: data.data,
      message: data.message,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req()
    req: Request,
    @Body()
    loginDto: LoginDto,
  ): Promise<ResponseDto> {
    console.log(loginDto)
    console.log(req.body)
    if (!loginDto.name) {
      console.log('error')
      return {
        success: false,
        data: loginDto,
        message: 'Login not successfully',
      };
    }
    const data = await this.usersService.findByNameAndPassword(loginDto);
    return {
      success: data.success,
      data: data.data,
      message: data.message,
    };
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  async users(
  ): Promise<ResponseDto> {
    console.log('hello')
    const user = await this.usersService.findAll();
    const data = user.data;
    console.log(data)
    return {
      success: true,
      data: data,
      message: 'Users found successful',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Body()
    logoutDto: LogoutDto,
  ): Promise<ResponseDto> {
    console.log(logoutDto)
    const data = await this.usersService.logout(logoutDto);
    console.log(data)
    return {
      success: data.success,
      data: data.data,
      message: data.message,
    };
  }
}
