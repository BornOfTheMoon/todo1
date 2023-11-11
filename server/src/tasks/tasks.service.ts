import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { ResponseDto } from './response.dto/response.dto';
import { TasksDto } from './tasks.dto/tasks.dto';
import { FindTasksDto } from './findTasks.dto/findTasks.dto';
import { UpdateTaskDto } from './updateTask.dto/updateTask.dto';
import { DeleteTaskDto } from './deleteTask.dto/deleteTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(tasksDto: TasksDto): Promise<ResponseDto> {
    const task = await this.tasksRepository.create({
        user: tasksDto.user,
        name: tasksDto.name,
        parent: tasksDto.parent,
        description: tasksDto.description,    
        is_finished: tasksDto.is_finished ? tasksDto.is_finished : false
    });
    const savedTask = await this.tasksRepository.save(task);
    return {
      success: true,
      data: savedTask,
    };
  }

  async findAll(findTasksDto: FindTasksDto): Promise<ResponseDto> {
    const task = await this.tasksRepository.find({
        where: {user: findTasksDto.user, parent: findTasksDto.parent} 
    });
    let tasks = []
    for (let i = 0; i < task.length; i++) {
      tasks.push({id: task[i].id, 
                  user: task[i].user,
                  name: task[i].name,
                  parent: task[i].parent,
                  description: task[i].description,
                  is_finished: task[i].is_finished
                })
    }
    return {
      success: true,
      data: tasks
    }
  }

  async remove(deleteTaskDto: DeleteTaskDto): Promise<ResponseDto> {
    const task = await this.tasksRepository.findOne({where: {id: deleteTaskDto.id}})
    await this.tasksRepository.delete(deleteTaskDto.id);
    console.log(deleteTaskDto.id + " successfully deleted");
    const tasks = await this.tasksRepository.find({where: {parent: deleteTaskDto.id, user: task?.user}})
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i]) {
            break;
        } else {
            this.remove({id: tasks[i].id});
        }
    }
    return {
        success: true,
        data: task,
    };
  }

  async update(updateTasksDto: UpdateTaskDto): Promise<ResponseDto> {
    const task = await this.tasksRepository.findOne({where: {id: updateTasksDto.id}});
    if (!task) {
        return {
            success: false,
            message: 'this task does not exit'
        }
    }

   task.name = updateTasksDto.name ? updateTasksDto.name : task.name,
   task.user = updateTasksDto.user ? updateTasksDto.user : task.user,
   task.description = updateTasksDto.description ? updateTasksDto.description : task.description,
   task.parent = updateTasksDto.parent ? updateTasksDto.parent : task.parent,
   task.is_finished = updateTasksDto.is_finished ? updateTasksDto.is_finished : task.is_finished

   await this.tasksRepository.update(task.id, task)
    return {
      success: true,
      data: task,
    };
  }
}