import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from './response.dto/response.dto';
import { RegisterDto } from './register.dto/register.dto';
import { LoginDto } from './login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LogoutDto } from './logout.dto/logout.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(registerDto: RegisterDto): Promise<ResponseDto> {
    const userExists = await this.usersRepository.findOne({
      where: { name: registerDto.name },
    });
    if (userExists) {
      return {
        success: false,
        data: null,
        message: 'User already exists',
      };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = await this.usersRepository.create({
      name: registerDto.name,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const tokens = await this.getTokens(savedUser.id, savedUser.name);
    await this.updateRefreshToken(savedUser.id, tokens.refreshToken);
    return {
      success: true,
      data: {
        id: savedUser.id,
        name: savedUser.name,
        tokens: tokens
      },
      message: 'User created successfully'
    };
  }

  async findByNameAndPassword(loginDto: LoginDto): Promise<ResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { name: loginDto.name },
    });
    if (!user) {
      return {
        success: false,
        data: null,
        message: 'User does not exist',
      };
    }
    console.log(loginDto)
    console.log(bcrypt.compare(loginDto.password, user.password));
    const passwordMatch = bcrypt.compareSync(loginDto.password, user.password);
    console.log(passwordMatch)
    if (!passwordMatch) {
      return {
        success: false,
        data: null,
        message: 'Password is incorrect',
      };
    }
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        tokens: tokens
      },
      message: 'Login successfully',
    };
  }

  async findAll(): Promise<ResponseDto> {
    const user = await this.usersRepository.find();
    const users = []
    for (let i = 0; i < user.length; i++) {
      users.push({id: user[i].id, 
                  name: user[i].name,
                  password: user[i].password,
                  refresh_token: user[i].refresh_token})
    }
    return {
      success: true,
      data: users
    }
  }



  async updateRefreshTokenInUser(userId: number, refresh_token: string | null): Promise<ResponseDto> {
    const user = await this.usersRepository.findOne({where: {id: userId}});
    if (!user) {
      return {
        success: false,
        data: null,
        message: 'User does not exit',
      };
    }

   user.refresh_token = refresh_token ? refresh_token : undefined,

   await this.usersRepository.update(userId, user)
    return {
      success: true,
      data: user,
    };
  }

  async logout(logoutDto: LogoutDto) {
    const user = await this.usersRepository.findOne({where: {id: logoutDto.id}});
    if (!user) {
      return {
        success: false,
        data: null,
        message: 'User does not exist',
      };
    }
    const data = await this.updateRefreshTokenInUser(user.id, null);
    let message = 'Something wrong :('
    if (data.success) {
      message = 'User does not exist'
    }
    return {
      success: data.success,
      data: data.data,
      message: 'Log out successfully',
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await  bcrypt.hash(refreshToken, salt);
    await this.updateRefreshTokenInUser(userId, hashedRefreshToken);
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}