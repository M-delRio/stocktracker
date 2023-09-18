import { NewStockBreakpoint } from "./new-stock-breakpoint.interface"

export type NewStock = {
  symbol: string
  nearestFloor: NewStockBreakpoint
  nearestCeiling: NewStockBreakpoint
}
