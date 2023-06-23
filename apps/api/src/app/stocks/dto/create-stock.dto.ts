export class CreateStockDto {
  symbol: string

  nearestCeiling: Breakpoint

  nearestFloor: Breakpoint
}

class Breakpoint {
  name: string

  value: number
}
