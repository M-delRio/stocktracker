import { useState, ChangeEvent } from "react"

import { registerUser } from "../../../../../libs/data-access/http"

const SignIn = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
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
    })
  }

  const onSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await registerUser({
        userName: form.userName,
        password: form.password,
      })
    } catch (err) {
      // todo let user know of success or fail
      console.log("todo handle fail")
    }

    resetForm()
  }

  return (
    <form onSubmit={onSubmitForm}>
      <h2>Sign In</h2>
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
        <label>Password</label>
        <input
          type="password"
          aria-label="Password field"
          name="password"
          value={form.password}
          onChange={onUpdateField}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default SignIn
