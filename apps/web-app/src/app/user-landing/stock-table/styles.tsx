import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import { TableRow } from "@mui/material"
import TableCell from "@mui/material/TableCell"

const StyledStocksContainer = styled(Grid)(({ theme }) => ({
  // border: "solid 1px blue",
  backgroundColor: theme.palette.grey[100],
  borderRadius: 4,
  // backgroudColor: theme.palette.primary.main,
  marginTop: "3.5rem",
  padding: "0.5rem",
  gap: "1.5rem",
}))

const StyledStock = styled(Grid)(({ theme }) => ({
  // border: `solid 1px ${theme.palette.primary.main}`,
  margin: 0,
  paddingBottom: "0.5rem",
  paddingRight: "0.5rem",
  borderRadius: 4,
  ".MuiTableCell-root": {
    borderBottom: 0,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
  },
  ".MuiTableBody-root": {
    backgroundColor: theme.palette.primary.light,
    //backgroundColor: theme.palette.grey[200],
  },
  "&.MuiGrid-root": {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}))

// const StyledPriceContainer = styled(TableRow)(({ theme }) => ({
//   display: "flex",
//   width: "100%",
//   alignItems: "center",
//   justifyContent: "start",
// }))

const StyledPriceContainer = styled("div")(
  ({ theme, isBelowRange, isAboveRange }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2rem",
    width: "2rem",
    borderRadius: 10,
    ...(isBelowRange && {
      backgroundColor: theme.palette.error.main,
    }),
    ...(isAboveRange && {
      backgroundColor: theme.palette.success.main,
    }),
  })
)

export { StyledStock, StyledStocksContainer, StyledPriceContainer }
