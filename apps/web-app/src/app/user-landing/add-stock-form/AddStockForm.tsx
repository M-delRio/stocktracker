import React, { useState } from "react"
import { NewStock } from "../../../../../../libs/interfaces/new-stock.interface"
import TextField from "@mui/material/TextField"

import { Grid } from "@mui/material"

type AddStockFormTypes = {
  handleAddStock: (newStock: NewStock) => void
}

const emptyNewStock = {
  symbol: "",
  nearestFloor: {
    name: "",
    value: "",
  },
  nearestCeiling: {
    name: "",
    value: "",
  },
}

const AddStockForm = ({ handleAddStock }: AddStockFormTypes) => {
  const [newStock, setNewStock] = useState<NewStock>(emptyNewStock)
  //extract to custom hook
  const [isMissingFloorName, setIsMissingFloorName] = useState<boolean>(false)
  const [isMissingFloorValue, setIsMissingFloorValue] = useState<boolean>(false)

  const missingFloorName = (): boolean => {
    // todo check for positive number?
    if (
      newStock.nearestFloor.name === "" &&
      typeof newStock.nearestFloor.value === "number"
    ) {
      return true
    }
    return false
  }

  const missingFloorValue = (): boolean => {
    if (
      newStock.nearestFloor.name !== "" &&
      typeof newStock.nearestFloor.value === "string"
    ) {
      return true
    }
    return false
  }

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
        value: newStock.nearestFloor.value,
      },
    })
  }

  const setNewFloorValue = (floorValue: number): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: newStock.nearestFloor?.name,
        value: floorValue,
      },
    })
  }

  const setNewCeilingValue = (ceilingValue: number): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: newStock.nearestCeiling?.name,
        value: ceilingValue || 0,
      },
    })
  }

  const setNewCeilingName = (ceilingName: string): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: ceilingName,
        value: newStock.nearestCeiling.value || 0,
      },
    })
  }

  return (
    <Grid
      component="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (missingFloorName()) {
          setIsMissingFloorName(true)
          return
        }

        if (missingFloorValue()) {
          setIsMissingFloorValue(true)
          return
        }

        handleAddStock(newStock)
        setNewStock(emptyNewStock)
      }}
    >
      <h3>Add New Stock</h3>
      <TextField
        required
        label="Symbol"
        variant="outlined"
        value={newStock.symbol}
        onChange={(e) => setNewSymbol(e.target.value)}
      ></TextField>
      <TextField
        error={isMissingFloorName}
        label="Floor Name"
        variant="outlined"
        value={newStock.nearestFloor.name}
        onChange={(e) => setNewFloorName(e.target.value)}
      ></TextField>
      <TextField
        error={isMissingFloorValue}
        label="Floor Value"
        placeholder="Floor Value"
        variant="outlined"
        value={newStock.nearestFloor.value}
        onChange={(e) => setNewFloorValue(+e.target.value)}
      ></TextField>
      <TextField
        label="Ceiling Name"
        variant="outlined"
        value={newStock.nearestCeiling.name}
        onChange={(e) => setNewCeilingName(e.target.value)}
      ></TextField>
      <TextField
        label="Ceiling Value"
        variant="outlined"
        value={newStock.nearestCeiling.value}
        onChange={(e) => setNewCeilingValue(+e.target.value)}
      ></TextField>
      <button type="submit">Add Stock</button>
    </Grid>
  )
}

export default AddStockForm
