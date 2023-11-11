export class UpdateTaskDto {
    id!: number;
    user?: number;
    name?: string;
    parent?: number;
    description?: string;
    is_finished?: boolean
  }