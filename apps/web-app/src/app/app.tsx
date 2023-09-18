import styled from "styled-components"

import SignIn from "./sign-in"
import RegisterForm from "./register"
import UserLanding from "./user-landing"

import { Route, Routes, Link } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Typography variant="h6" noWrap component="a" href="/">
                STOCK-TRACKER
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <div role="navigation">
        <li>
          <Link to="/fixedUser">
            Click here for a Sample User Landing Page.
          </Link>
        </li>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SignIn />
              <Link to="/register">New User? Register.</Link>
            </div>
          }
        >
          <Route
            path="/register"
            element={
              <div>
                <RegisterForm />
                <Link to="/">Back Home.</Link>
              </div>
            }
          />
        </Route>
        <Route
          path="fixedUser"
          element={
            <div>
              <UserLanding userName="ah" />
              <Link to="/">Back Home.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  )
}

export default App
