import { useState, ChangeEvent } from "react"

import { registerUser } from "../../../../../libs/data-access/http"

const RegisterForm = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    // confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  })

  const onUpdateField = (e: ChangeEvent<HTMLInputElement>) => {
    const nextFormState = {
      ...form,
      [e.target?.name]: e.target.value,
    }
    setForm(nextFormState)
  }

  const resetForm = () => {
    setForm({
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    })
  }

  const onSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await registerUser({
        userName: form.userName,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      })
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail")
    }

    resetForm()
  }

  return (
    <form onSubmit={onSubmitForm}>
      <h2>Register New User</h2>
      <div>
        <label>userName</label>
        <input
          type="text"
          aria-label="userName field"
          name="userName"
          value={form.userName}
          onChange={onUpdateField}
        />
      </div>
      <div>
        <label>firstName</label>
        <input
          type="text"
          aria-label="firstName field"
          name="firstName"
          value={form.firstName}
          onChange={onUpdateField}
        />
      </div>
      <div>
        <label>lastName</label>
        <input
          type="text"
          aria-label="lastName field"
          name="lastName"
          value={form.lastName}
          onChange={onUpdateField}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          aria-label="Password field"
          name="password"
          value={form.password}
          onChange={onUpdateField}
        />
      </div>
      {/* <div>
        <label>Confirm Password</label>
        <input
          type="password"
          aria-label="Confirm password field"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onUpdateField}
        />
      </div> */}
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default RegisterForm
