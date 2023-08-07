import { Breakpoint } from "./breakpoint.interface"

export interface Stock {
  symbol: string
  price?: number
  nearestFloor: Breakpoint
  nearestCeiling: Breakpoint
  userName: string
}
