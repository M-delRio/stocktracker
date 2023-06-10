import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"
import { Stock } from "../../stocks/entities/stock.entity"

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  userName: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column((type) => Stock)
  stocks: Stock[]
}
