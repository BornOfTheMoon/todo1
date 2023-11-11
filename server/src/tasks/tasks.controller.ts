import {Controller, Post, Get, Body, HttpStatus, HttpCode, Delete, Patch} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDto } from './tasks.dto/tasks.dto';
import { ResponseDto } from './response.dto/response.dto';
import { FindTasksDto } from './findTasks.dto/findTasks.dto';
import { UpdateTaskDto } from './updateTask.dto/updateTask.dto';
import { DeleteTaskDto } from './deleteTask.dto/deleteTask.dto';

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

  @Get('tasks')
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

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body()
    deleteTaskDto: DeleteTaskDto,
  ): Promise<ResponseDto> {
    const task = await this.tasksService.remove(deleteTaskDto);
    const data = task.data;
    return {
      success: true,
      data: data,
      message: 'Task deleted successfully',
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
      success: true,
      data: data,
      message: 'Task updated successfully'
    }
  }
}