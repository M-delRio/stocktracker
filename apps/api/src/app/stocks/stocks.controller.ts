import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { StocksService } from "./stocks.service"
import { CreateStockDto } from "./dto/create-stock.dto"
import { UpdateStockDto } from "./dto/update-stock.dto"

@Controller("users/:userName/stocks")
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto)
  }

  @Get()
  findAll(@Param("userName") userName: string) {
    return this.stocksService.findAll(userName)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stocksService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto)
  }

  @Delete(":symbol")
  remove(@Param("symbol") symbol: string, @Param("userName") userName: string) {
    return this.stocksService.remove(symbol, userName)
  }
}
