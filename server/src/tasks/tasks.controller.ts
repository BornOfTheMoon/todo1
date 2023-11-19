import {Controller, Post, Get, Body, HttpStatus, HttpCode, Delete, Patch} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './tasks.dto/tasks.dto';
import { ResponseDto } from './response.dto/response.dto';
import { FindTasksDto } from './findTasks.dto/findTasks.dto';
import { UpdateTaskDto } from './updateTask.dto/updateTask.dto';
import { FindTaskDto } from './findTask.dto/findTask.dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async new(@Body() tasksDto: TasksDto): Promise<ResponseDto> {
    const task = await this.tasksService.create(tasksDto);
    const data = task.data;
    return {
      success: true,
      data: data,
      message: 'Task created successfully',
    };
  }

  @Post('tasks')
  @HttpCode(HttpStatus.OK)
  async tasks(
    @Body()
    findTasksDto: FindTasksDto,
  ): Promise<ResponseDto> {
    const task = await this.tasksService.findAll(findTasksDto);
    const data = task.data;
    return {
      success: true,
      data: data,
      message: 'Tasks found successfully',
    };
  }

  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  async task(
    @Body()
    findTaskDto: FindTaskDto,
  ): Promise<ResponseDto> {
    console.log(findTaskDto)
    const data = await this.tasksService.findById(findTaskDto.id);
    console.log(data)
    return {
      success: data.success,
      data: data.data,
      message: data.message,
    };
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body()
    deleteTaskDto: FindTaskDto,
  ): Promise<ResponseDto> {
    const task = await this.tasksService.remove(deleteTaskDto);
    return {
      success: task.success,
      data: task.data,
      message: task.message,
    };
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body()
    updateTaskDto: UpdateTaskDto
  ) : Promise<ResponseDto> {
    const data = await this.tasksService.update(updateTaskDto);
    return {
      success: data.success,
      data: data.data,
      message: data.message 
    }
  }
}