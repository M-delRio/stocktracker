import axios, { AxiosError } from "axios"

type RegisterUserArgs = {
  userName: string
  password: string
  firstName: string
  lastName: string
  email: string
}

// todo extract to env var
const PORT = 3000
const serverEndpoint = `http://localhost:${PORT}/`

export const registerUser = async (data: RegisterUserArgs) => {
  try {
    await postRequest(serverEndpoint + "users/", data)

    console.log("Success: user registered in registerUser")
  } catch (error: any | AxiosError) {
    console.log("Failed to register user")
    throw new Error("")
  }
}

const postRequest = async <T>(endpoint: string, data: T): Promise<void> => {
  try {
    const response = await axios.post(endpoint, data)

    console.log(JSON.stringify(response))
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } else {
      // Just a stock error
    }
    throw new Error("")
  }
}
