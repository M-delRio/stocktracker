import { Breakpoint } from "./breakpoint.interface"

export type Stock = {
  symbol: string
  price?: number
  nearestFloor?: Breakpoint
  nearestCeiling?: Breakpoint
  userName: string
}
