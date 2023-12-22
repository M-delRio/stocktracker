import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

const StyledSubmit = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightMedium,
  backgroundColor: theme.palette.primary.light,
}))

export { StyledSubmit }
