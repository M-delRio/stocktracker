import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"

const StyledLogo = styled("h2")(({ theme }) => ({
  color: theme.palette.secondary.light,
}))

const StyledUserContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  padding: "0 8px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
}))

const StyledHeaderToolBar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  backgroundColor: theme.palette.common.white,
}))

export { StyledLogo, StyledHeaderToolBar, StyledUserContainer }
