import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"
import { Breakpoint } from "./breakpoint.entity"

@Entity()
export class Stock {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  symbol: string

  @Column()
  nearestCeiling: Breakpoint

  @Column()
  nearestFloor: Breakpoint
}
