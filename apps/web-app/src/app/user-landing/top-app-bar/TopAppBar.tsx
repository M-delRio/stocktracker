import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import {
  StyledLogo,
  StyledHeaderToolBar,
  StyledUserContainer,
} from "./TopAppBar.styles"

interface Props {
  userName: string
}

const getUserInitials = (userName: string): string => {
  const names = userName.split(" ")

  const initials = names.map((name) => name.charAt(0)).join("")

  return initials
}

const TopAppBar = ({ userName }: Props) => {
  const userInitials = getUserInitials(userName)

  return (
    <AppBar>
      <StyledHeaderToolBar>
        <StyledLogo>SP</StyledLogo>
        <StyledUserContainer>
          <Typography>{userInitials}</Typography>
        </StyledUserContainer>
      </StyledHeaderToolBar>
    </AppBar>
  )
}

export default TopAppBar
