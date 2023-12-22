import React, { useState } from "react"
import { NewStock } from "../../../../../../libs/interfaces/new-stock.interface"
import { StyledMainContentContainer } from "../stock-table/styles"
import { StyledSubmit } from "./AddStockForm.styles"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

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

  const [isMissingFloorName, setIsMissingFloorName] = useState<boolean>(false)
  const [isMissingFloorValue, setIsMissingFloorValue] = useState<boolean>(false)
  const [isMissingCeilingName, setIsMissingCeilingName] =
    useState<boolean>(false)
  const [isMissingCeilingValue, setIsMissingCeilingValue] =
    useState<boolean>(false)

  const missingFloorName = (): boolean => {
    // todo check for positive number?
    if (newStock.nearestFloor.name === "" && !newStock.nearestFloor.value) {
      return true
    }
    return false
  }

  const missingFloorValue = (): boolean => {
    if (newStock.nearestFloor.name !== "" && !newStock.nearestFloor.value) {
      console.log("here")

      return true
    }
    return false
  }

  const missingCeilingName = (): boolean => {
    // todo check for positive number?
    if (newStock.nearestCeiling.name === "" && !newStock.nearestCeiling.value) {
      return true
    }
    return false
  }

  const missingCeilingValue = (): boolean => {
    if (newStock.nearestCeiling.name !== "" && !newStock.nearestCeiling.value) {
      console.log("here")

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

  const setNewFloorValue = (floorValue: number | string): void => {
    setNewStock({
      ...newStock,
      nearestFloor: {
        name: newStock.nearestFloor?.name,
        value: floorValue,
      },
    })
  }

  const setNewCeilingValue = (ceilingValue: number | string): void => {
    setNewStock({
      ...newStock,
      nearestCeiling: {
        name: newStock.nearestCeiling?.name,
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

  return (
    // <StyledMainContentContainer>
    <Grid
      sx={{
        minWidth: 100,
        maxWidth: 300,
        paddingTop: "0.5rem",
        paddingLeft: "2%",
      }}
      container={true}
      direction="column"
      columns={1}
      rowSpacing={2}
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

        if (missingCeilingName()) {
          setIsMissingCeilingName(true)
          return
        }

        if (missingCeilingValue()) {
          setIsMissingCeilingValue(true)
          return
        }

        handleAddStock(newStock)
        setNewStock(emptyNewStock)
      }}
    >
      <Grid item={true}>
        <Typography align="left" variant="h5">
          Add New Stock
        </Typography>
      </Grid>
      <Grid item={true}>
        <TextField
          fullWidth={true}
          color="primary"
          required
          label="Symbol"
          size="small"
          variant="outlined"
          value={newStock.symbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item={true}>
        <TextField
          fullWidth={true}
          color="primary"
          error={isMissingFloorName}
          label="Floor Name"
          size="small"
          variant="outlined"
          value={newStock.nearestFloor.name}
          onChange={(e) => setNewFloorName(e.target.value)}
        ></TextField>
      </Grid>

      <Grid item={true}>
        <TextField
          fullWidth={true}
          error={isMissingFloorValue}
          label="Floor Value"
          type="number"
          size="small"
          variant="outlined"
          value={newStock.nearestFloor.value}
          onChange={(e) => setNewFloorValue(e.target.value)}
        ></TextField>
      </Grid>

      <Grid item={true}>
        <TextField
          fullWidth={true}
          label="Ceiling Name"
          variant="outlined"
          size="small"
          value={newStock.nearestCeiling.name}
          onChange={(e) => setNewCeilingName(e.target.value)}
        ></TextField>
      </Grid>

      <Grid item={true}>
        <TextField
          fullWidth={true}
          label="Ceiling Value"
          type="number"
          variant="outlined"
          size="small"
          value={newStock.nearestCeiling.value}
          onChange={(e) => setNewCeilingValue(e.target.value)}
        ></TextField>
      </Grid>

      <Grid
        sx={{
          alignSelf: "flex-end",
        }}
        item={true}
      >
        <StyledSubmit color="primary" type="submit" variant="outlined">
          Add Stock
        </StyledSubmit>
      </Grid>
    </Grid>
    // </StyledMainContentContainer>
  )
}

export default AddStockForm
