import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', nullable: false})
    name!: string;

    @Column({type: 'integer', nullable: false, default: 0})
    parent!: number;

    @Column({type: 'varchar', nullable: true})
    description?: string;

    @Column({type: 'boolean', nullable: false, default: false})
    is_finished?: boolean;

    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: 'CASCADE' })
    user!: number;
}