import * as React from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import {
  StyledStock,
  StyledStocksContainer,
  StyledPriceContainer,
} from "./styles"
import { Stock } from "../../../../../../libs/interfaces/stock.interface"

type StockTableProps = {
  userName: string | undefined
  stocks: Stock[] | undefined
  handleEditStock?: ((symbol: string) => Promise<void>) | undefined
  handleDeleteStock?: ((symbol: string) => Promise<void>) | undefined
}

const StockTable = ({
  userName,
  stocks,
  handleEditStock,
  handleDeleteStock,
}: StockTableProps): JSX.Element => {
  return (
    <div>
      <StyledStocksContainer container direction="row">
        {stocks?.map((stock) => (
          <StyledStock container direction="row" xs="auto" spacing={3}>
            <Grid container item direction={"column"} xs="auto" spacing={1}>
              <Grid
                item
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "fontWeightBold",
                }}
              >
                {stock.symbol}
              </Grid>
              <Grid item>
                <EditIcon fontSize="small" />
              </Grid>
              <Grid item>
                <DeleteIcon fontSize="small" />
              </Grid>
            </Grid>
            <Grid container item direction={"column"} xs="auto" spacing={1}>
              <TableContainer component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell>{stock.nearestCeiling?.name}</TableCell>
                    <TableCell>${stock.nearestCeiling?.value}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>
                      <StyledPriceContainer
                        isBelowRange={
                          (stock.price ?? 1) <=
                          (stock.nearestFloor?.value ??
                            Number.NEGATIVE_INFINITY)
                        }
                        isAboveRange={
                          (stock.price ?? 1) >=
                          (stock.nearestCeiling?.value ??
                            Number.POSITIVE_INFINITY)
                        }
                      >
                        ${stock.price}
                      </StyledPriceContainer>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{stock.nearestFloor?.name}</TableCell>
                    <TableCell>${stock.nearestFloor?.value}</TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </Grid>
          </StyledStock>
        ))}
      </StyledStocksContainer>
      {/* <table>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.symbol}</td>
            <td>{stock.nearestFloor?.name}</td>
            <td>{stock.nearestFloor?.value}</td>
            <td>{stock.nearestCeiling?.name}</td>
            <td>{stock.nearestCeiling?.value}</td>
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
      </table> */}
    </div>
  )
}

export default StockTable
