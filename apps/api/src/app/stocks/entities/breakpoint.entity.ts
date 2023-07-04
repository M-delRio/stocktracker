import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Breakpoint {
  @Column()
  name: string

  @Column()
  value: number
}
