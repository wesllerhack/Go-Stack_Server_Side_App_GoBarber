import { Column, CreateDateColumn, Entity, Not, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('notifications')
class Notificarion {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    contenct: string;

    @Column('uuid')
    recipient_id: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Notification;