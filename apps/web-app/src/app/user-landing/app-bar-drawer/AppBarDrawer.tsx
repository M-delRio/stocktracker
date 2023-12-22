import * as React from "react"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Drawer from "@mui/material/Drawer"
import AddIcon from "@mui/icons-material/Add"
import ListIcon from "@mui/icons-material/List"
import { Button } from "@mui/material"
import { UserTabs } from ".."
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { KeyboardArrowLeft } from "@mui/icons-material"

const drawerOptions = [
  {
    name: "Stocks",
    icon: <ListIcon />,
    userTab: "stocks" as UserTabs,
  },
  {
    name: "Add Stock",
    icon: <AddIcon />,
    userTab: "addStock" as UserTabs,
  },
]

type AppBarDrawerProps = {
  handleSetSelectedTab: (newSelectedTab: UserTabs) => void
}

// todo change state to be show descriptions or not, icons always show
const AppBarDrawer = ({ handleSetSelectedTab }: AppBarDrawerProps) => {
  const [expand, setExpand] = React.useState(true)

  const getList = () => (
    <>
      {drawerOptions.map((item, index) => (
        <ListItem key={index}>
          <Button
            onClick={() => {
              handleSetSelectedTab(UserTabs[item.userTab])
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {expand && (
              <Typography color="primary.light">{item.name}</Typography>
            )}
          </Button>
        </ListItem>
      ))}
    </>
  )
  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          position: "static",
          marginTop: 0,
        },
      }}
      open={true}
      anchor={"left"}
      onClose={() => setExpand(false)}
    >
      <List>
        <ListItem disablePadding={true} alignItems="flex-start">
          <IconButton size="small" onClick={() => setExpand(!expand)}>
            {expand ? <KeyboardArrowLeft /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </ListItem>
        {getList()}
      </List>
    </Drawer>
  )
}

export default AppBarDrawer
