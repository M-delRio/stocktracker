import { useState, FormEvent } from "react"
import { Stock } from "../../../../../libs/interfaces/stock.interface"

import { addStock } from "../../../../../libs/data-access/http"

interface Props {
  userId: string
}

const UserLanding = ({ userId }: Props) => {
  const [stocks, setStocks] = useState<Stock[]>([])

  const [newStock, setNewStock] = useState<Stock>({
    symbol: "",
    nearestFloor: {
      name: "",
      value: undefined,
    },
    nearestCeiling: {
      name: "",
      value: undefined,
    },
  })

  const handleSetNewSymbol = (symbol: string): void => {
    setNewStock({
      ...newStock,
      symbol,
    })
  }

  // todo combine name and value as required dependents?
  const handleSetNewFloorName = (floorName: string): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: floorName,
        value: newStock.nearestCeiling.value,
      },
    })
  }

  const handleSetNewFloorValue = (floorValue: number): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: newStock.nearestFloor.name,
        value: floorValue,
      },
    })
  }

  const handleSetNewCeilingValue = (ceilingValue: number): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: newStock.nearestCeiling.name,
        value: ceilingValue,
      },
    })
  }

  const handleSetNewCeilingName = (ceilingName: string): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: ceilingName,
        value: newStock.nearestCeiling.value,
      },
    })
  }

  // const [newStockSymbol, setNewStockSymbol] = useState("")
  // const [newStockFloor, setNewStockFloor] = useState({
  //   name: "",
  //   value: 0
  // })
  // const [newStockCeiling, setNewStockCeiling] = useState({
  //   name: "",
  //   value: 0
  // })

  const handleAddStock = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log(JSON.stringify(newStock))

    try {
      await addStock({
        symbol: newStock.symbol,
        nearestFloor: {
          name: newStock.nearestFloor.name,
          value: newStock.nearestFloor.value as number,
        },
        nearestCeiling: {
          name: newStock.nearestCeiling.name,
          value: newStock.nearestCeiling.value as number,
        },
      })
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail")
    }

    // todo send to b/e
    // success? update state

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
      <h2>{userId}, Here's how things are looking for your stocks</h2>

      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>{stock.symbol}</li>
        ))}
      </ul>

      <div>
        <h3>Add New Stock</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddStock(e)
          }}
        >
          <input
            type="text"
            placeholder="Symbol"
            value={newStock.symbol}
            onChange={(e) => handleSetNewSymbol(e.target.value)}
          />
          <input
            type="text"
            placeholder="Floor Name"
            value={newStock.nearestFloor.name}
            onChange={(e) => handleSetNewFloorName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Floor Value"
            value={newStock.nearestFloor.value}
            onChange={(e) => handleSetNewFloorValue(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Ceiling Name"
            value={newStock.nearestCeiling.name}
            onChange={(e) => handleSetNewCeilingName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock Ceiling Value"
            value={newStock.nearestCeiling.value}
            onChange={(e) => handleSetNewCeilingValue(Number(e.target.value))}
          />
          <button type="submit">Add Stock</button>
        </form>
      </div>
    </div>
  )
}

export default UserLanding
