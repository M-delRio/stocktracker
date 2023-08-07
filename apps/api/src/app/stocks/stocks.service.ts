import { Body, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateStockDto } from "./dto/create-stock.dto"
import { UpdateStockDto } from "./dto/update-stock.dto"
import { Stock } from "./entities/stock.entity"

// todo rm injectable?
@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>
  ) {}

  create(@Body() createStockDto: CreateStockDto) {
    console.log(JSON.stringify(createStockDto))

    const stock = new Stock()
    stock.symbol = createStockDto.symbol
    stock.nearestFloor = {
      name: createStockDto.nearestFloor.name,
      value: createStockDto.nearestFloor.value,
    }
    stock.nearestCeiling = {
      name: createStockDto.nearestCeiling.name,
      value: createStockDto.nearestCeiling.value,
    }
    stock.userName = createStockDto.userName

    this.stocksRepository.save(stock)

    return "Stock Added!"
  }

  findAll() {
    return this.stocksRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`
  }

  remove(symbol, userName: string) {
    console.log(`remove ${symbol} ${userName}`)

    return this.stocksRepository.delete({
      symbol,
      userName,
    })
  }
}
