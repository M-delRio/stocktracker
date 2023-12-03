import React, { createContext, useState, useEffect } from "react"
import { NewStock } from "../../../../../libs/interfaces/new-stock.interface"
import { Stock } from "../../../../../libs/interfaces/stock.interface"
import AddStockForm from "./add-stock-form"
import AppBarDrawer from "./app-bar-drawer"

import {
  addStock,
  getStockPrices,
  getStocks,
  removeStock,
} from "../../../../../libs/data-access/http"
import StockTable from "./stock-table"

interface Props {
  userName: string
}

enum UserTabs {
  stocks = "stocks",
  addStock = "addStock",
}

type AllContextValue = {
  userName: string
  stocks: Stock[]
  handleEditStock: (symbol: string) => void
  handleDeleteStock: (symbol: string) => void
  handleAddStock: (newStock: NewStock) => void
  selectedTab: UserTabs
  handleSetSelectedTab: (newSelectedTab: UserTabs) => void
}

// todo split this up
const AllContext = createContext<AllContextValue | null>(null)

const UserLanding = ({ userName }: Props): JSX.Element => {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [selectedTab, setSelectedTab] = useState<UserTabs>(UserTabs.stocks)

  useEffect(() => {
    const handleGetStocks = async () => {
      const userStocks = await getStocks(userName)

      console.log(JSON.stringify(userStocks))

      setStocks(userStocks)
    }

    handleGetStocks().catch((err) => {
      console.log(err)
    })
  }, [userName])

  const handleDeleteStock = async (symbol: string): Promise<void> => {
    try {
      await removeStock(symbol, userName)

      setStocks(stocks.filter((stock) => stock.symbol !== symbol))
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail add stock")
    }
  }

  const handleEditStock = async (symbol: string): Promise<void> => {
    console.log("in handleEditStock")
  }

  const handleAddStock = async (newStock: NewStock): Promise<void> => {
    console.log(JSON.stringify(newStock))

    try {
      // add to b/e
      await addStock(newStock, userName)

      // await addStock({
      //   symbol: newStock.symbol,
      //   nearestFloor: {
      //     name: newStock.nearestFloor.name,
      //     value: newStock.nearestFloor.value as number,
      //   },
      //   nearestCeiling: {
      //     name: newStock.nearestCeiling.name,
      //     value: newStock.nearestCeiling.value as number,
      //   },
      //   ,
      // })

      // inject price to f/e
      const stockPrices = await getStockPrices([newStock.symbol])

      setStocks([
        ...stocks,
        {
          symbol: newStock.symbol,
          nearestFloor: {
            name: newStock.nearestFloor.name,
            value: +newStock.nearestFloor.value,
          },
          nearestCeiling: {
            name: newStock.nearestCeiling.name,
            value: +newStock.nearestCeiling.value,
          },
          userName: "",
          price: stockPrices[newStock.symbol],
        },
      ])
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail add stock")
    }
  }

  const handleSetSelectedTab = (newSelectedTab: UserTabs): void => {
    setSelectedTab(newSelectedTab)
  }

  const AllContextValue = {
    userName,
    stocks,
    handleEditStock,
    handleDeleteStock,
    handleAddStock,
    selectedTab,
    handleSetSelectedTab,
  }

  return (
    <div>
      <AllContext.Provider value={AllContextValue}>
        <AppBarDrawer />
        {/* <StockTable userName={userName} stocks={stocks} handleEditStock={handleEditStock} handleDeleteStock={handleDeleteStock} />
      <AddStockForm handleAddStock={handleAddStock} /> */}
      </AllContext.Provider>
    </div>
  )
}

export { AllContext, UserLanding }
