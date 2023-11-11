import {Controller, Post, Get, Body, HttpStatus, HttpCode} from '@nestjs/common';
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
    const user = await this.usersService.create(registerDto);
    const data = user.data;
    return {
      success: true,
      data: data,
      message: 'User created successfully',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    loginDto: LoginDto,
  ): Promise<ResponseDto> {
    const user = await this.usersService.findByNameAndPassword(loginDto);
    const data = user.data;
    return {
      success: true,
      data: data,
      message: 'Login successfully',
    };
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  async users(
    @Body()
    usersDto: UsersDto,
  ): Promise<ResponseDto> {
    const user = await this.usersService.findAll();
    const data = user.data;
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
    const user = await this.usersService.logout(logoutDto);
    const data = user.data;
    return {
      success: true,
      data: data,
      message: 'Logout successfully',
    };
  }
}
