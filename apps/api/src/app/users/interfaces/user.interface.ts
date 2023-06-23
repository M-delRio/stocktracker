import { Stock } from "../../stocks/interfaces/stock.interface"

export interface IUser {
  name: string
  stocks: Stock[]
}
