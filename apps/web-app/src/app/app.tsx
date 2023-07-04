import styled from "styled-components"

import SignIn from "./sign-in"
import RegisterForm from "./register"
import UserLanding from "./user-landing"

import { Route, Routes, Link } from "react-router-dom"

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fixedUser">
              Click here for a Sample User Landing Page.
            </Link>
          </li>
        </ul>
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
        />
        <Route
          path="/register"
          element={
            <div>
              <RegisterForm />
              <Link to="/">Back Home.</Link>
            </div>
          }
        />
        <Route
          path="/fixedUser"
          element={
            <div>
              <UserLanding userId="Joe Blow ID" />
              <Link to="/">Back Home.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  )
}

export default App
