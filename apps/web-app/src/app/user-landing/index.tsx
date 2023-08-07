import { useState, useEffect } from "react"
import { Stock } from "../../../../../libs/interfaces/stock.interface"

import {
  addStock,
  getStockPrices,
  getStocks,
  removeStock,
} from "../../../../../libs/data-access/http"

interface Props {
  userName: string
}

const emptyNewStock = {
  symbol: "",
  nearestFloor: {
    name: "",
    value: 0,
  },
  nearestCeiling: {
    name: "",
    value: 0,
  },
  userName: "",
}

const UserLanding = ({ userName }: Props) => {
  const [stocks, setStocks] = useState<Stock[]>([])

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

  const [newStock, setNewStock] = useState<Stock>(emptyNewStock)

  const setNewSymbol = (symbol: string): void => {
    setNewStock({
      ...newStock,
      symbol,
    })
  }

  // todo combine name and value as required dependents?
  const setNewFloorName = (floorName: string): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: floorName,
        value: newStock.nearestCeiling.value,
      },
    })
  }

  const setNewFloorValue = (floorValue: number): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: newStock.nearestFloor.name,
        value: floorValue,
      },
    })
  }

  const setNewCeilingValue = (ceilingValue: number): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: newStock.nearestCeiling.name,
        value: ceilingValue,
      },
    })
  }

  const setNewCeilingName = (ceilingName: string): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: ceilingName,
        value: newStock.nearestCeiling.value,
      },
    })
  }

  const handleDeleteStock = async (symbol: string): Promise<void> => {
    try {
      await removeStock(symbol, userName)

      setStocks(stocks.filter((stock) => stock.symbol !== symbol))
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail add stock")
    }
  }

  const handleEditStock = async (symbol: string): Promise<void> => undefined

  const handleAddStock = async (): Promise<void> => {
    console.log(JSON.stringify(newStock))

    try {
      // add to b/e
      await addStock({
        ...newStock,
        userName,
      })

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
      //   userName,
      // })

      // inject price to f/e
      const stockPrices = await getStockPrices([newStock.symbol])

      setStocks([
        ...stocks,
        { ...newStock, price: stockPrices[newStock.symbol] },
      ])
      // reset state for future new stock
      setNewStock(emptyNewStock)
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail add stock")
    }

    // if (newStockSymbol.trim() !== "") {
    //   const newStock: Stock = {
    //     symbol: newStockSymbol.trim(),
    //     nearestFloor: {
    //       name: "",
    //       value: 0,
    //     },
    //     nearestCeiling: {
    //       name: "",
    //       value: 0,
    //     },
    //   }

    //   // setStocks((prevStocks) => [...prevStocks, newStock])

    //   console.log()

    //   // todo extract to clear func see other component
    //   setNewStockSymbol("")
    //   setNewStockFloor({
    //     name: "",
    //     value: 0,
    //   })
    //   setNewStockCeiling({
    //     name: "",
    //     value: 0,
    //   })
    // }
  }

  return (
    <div>
      <h2>{userName}, Here's how things are looking for your stocks</h2>
      <table>
        <tr>
          <th>Symbol</th>
          <th>Floor Name</th>
          <th>Floor Value</th>
          <th>Ceiling Name</th>
          <th>Ceiling Value</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.nearestFloor.name}</td>
            <td>{stock.nearestFloor.value}</td>
            <td>{stock.nearestCeiling.name}</td>
            <td>{stock.nearestCeiling.value}</td>
            <td>{stock.price}</td>
            <td>
              <button
                key={`edit ${stock.symbol}`}
                onClick={() => handleEditStock(stock.symbol)}
              >
                Edit
              </button>
              <button
                key={`delete ${stock.symbol}`}
                onClick={() => handleDeleteStock(stock.symbol)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>

      <h3>Add New Stock</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddStock()
        }}
      >
        <input
          type="text"
          placeholder="Symbol"
          value={newStock.symbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <input
          type="text"
          placeholder="Floor Name"
          value={newStock.nearestFloor.name}
          onChange={(e) => setNewFloorName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Floor Value"
          value={newStock.nearestFloor.value}
          onChange={(e) => setNewFloorValue(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Ceiling Name"
          value={newStock.nearestCeiling.name}
          onChange={(e) => setNewCeilingName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Ceiling Value"
          value={newStock.nearestCeiling.value}
          onChange={(e) => setNewCeilingValue(Number(e.target.value))}
        />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  )
}

export default UserLanding
