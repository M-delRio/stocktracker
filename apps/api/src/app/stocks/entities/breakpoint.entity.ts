import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Breakpoint {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  name: string

  @Column()
  value: number
}
