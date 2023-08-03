import { Breakpoint } from "./breakpoint.interface"

export interface Stock {
  // stockId: string
  symbol: string
  price?: number
  nearestFloor: Breakpoint
  nearestCeiling: Breakpoint
}
