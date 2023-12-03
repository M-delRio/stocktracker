import styled from "styled-components"
import { Route, Routes, Link } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"

import SignIn from "./sign-in"
import RegisterForm from "./register"
import { UserLanding } from "./user-landing"
// import TopHeader from "./user-landing/top-header"
import AppBarDrawer from "./user-landing/app-bar-drawer"

export function App() {
  return (
    <>
      <div role="navigation">
        <li>
          {/* <Link to="/fixedUser">
            Click here for a Sample User Landing Page.
          </Link> */}
        </li>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <AppBar position="static">
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <Link to="/">
                      {/* <Typography variant="h6" noWrap component="a" href="/">
                    STOCK-TRACKER
                  </Typography> */}
                    </Link>
                  </Toolbar>
                </Container>
              </AppBar>
              <SignIn />
              <Link to="/register">New User? Register.</Link>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <RegisterForm />
            </div>
          }
        />
        <Route
          path="fixedUser"
          element={
            <div>
              <AppBarDrawer />
              {/* <TopHeader userName="ah" /> */}
              <UserLanding userName="ah" />
              <Link to="/">Sign out</Link>
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
