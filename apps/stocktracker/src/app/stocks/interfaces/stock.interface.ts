import { Breakpoint } from "./breakpoint.interface"

export interface Stock {
  stockId: string
  symbol: string
  nearestFloor: Breakpoint
  nearestCeiling: Breakpoint
}
