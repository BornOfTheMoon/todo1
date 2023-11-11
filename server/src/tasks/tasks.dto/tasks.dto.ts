export class TasksDto {
    user!: number;
    name!: string;
    parent?: number;
    description?: string;
    is_finished?: boolean
  }