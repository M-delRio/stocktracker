export class CreateStockDto {
  symbol: string

  nearestCeiling: Breakpoint

  nearestFloor: Breakpoint

  userName: string
}

class Breakpoint {
  name: string

  value: number
}
