import { Task } from "src/tasks/tasks.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', nullable: false, unique: true})
    name!: string;

    @Column({type: 'varchar', nullable: false})
    password!: string;

    @Column({type: 'varchar', nullable: true})
    refresh_token?: string;

    @OneToMany(() => Task, (task) => task.user)
    public tasks?: Task[];
}