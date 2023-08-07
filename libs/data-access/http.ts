import RegisterForm from "apps/web-app/src/app/register"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { Stock } from "libs/interfaces/stock.interface"

type RegisterUserArgs = {
  userName: string
  password: string
  firstName: string
  lastName: string
  email: string
}

type AddStockArgs = {
  symbol: string
  nearestFloor: {
    name: string
    value: number
  }
  nearestCeiling: {
    name: string
    value: number
  }
  userName: string
}

type StockPrice = { [key: string]: number }

export type StockDataResponse = { symbol: string; ask: number }

// todo extract to env var
const PORT = 3000
const serverEndpoint = `http://localhost:${PORT}/`
const financeApiURL = "https://mboum-finance.p.rapidapi.com/qu/quote"

export const getStockPrices = async (
  stockSymbols: string[]
): Promise<{ [key: string]: number }> => {
  console.log(`symbols: ${stockSymbols.toString()}`)

  // const requestOptions = {
  //   method: "GET",
  //   url: financeApiURL,
  //   params: {
  //     symbol: stockSymbols.toString(),
  //   },
  //   headers: {
  //     // todo extract to env var DON'T PUSH
  //     "X-RapidAPI-Key": "",
  //     "X-RapidAPI-Host": "-finance.p.rapidapi.com",
  //   },
  // }

  let stockPrices: StockPrice = {}

  try {
    //   const priceResponse = await httpRequest<StockDataResponse[]>(requestOptions)

    //   // change DS to {symbol: price}
    //   for (const stockData of priceResponse) {
    //     stockPrices[stockData.symbol] = stockData.ask
    //   }

    console.log(
      `Success: retrieved stock prices: ${JSON.stringify(stockPrices)}`
    )

    return stockPrices
  } catch (error: any | AxiosError) {
    console.log("Failed to fetch stock price")
    throw new Error("")
  }
}

// make partial if id added back to Stock interface
export const getStocks = async (userName: string): Promise<Stock[]> => {
  let stockPrices: StockPrice
  try {
    const requestOptions = {
      method: "GET",
      url: serverEndpoint + `users/${userName}/stocks`,
    }

    let stocks = await httpRequest<Stock[]>(requestOptions)

    console.log("Success: retrieved user's stocks:", stocks)

    stocks = stocks.map((stock) => ({
      symbol: stock.symbol,
      nearestFloor: stock.nearestFloor,
      nearestCeiling: stock.nearestCeiling,
      userName: stock.userName,
    }))

    const stockSymbols = stocks.map((stock) => {
      return stock.symbol
    })

    try {
      stockPrices = await getStockPrices(stockSymbols)

      stocks = stocks.map((stock) => ({
        ...stock,
        price: 10,
        // price: stockPrices[stock.symbol],
      }))
    } catch (err) {
      // todo cache stock price on b/e w/redis
      console.log(`unable to fetch prices for stocks: ${stockSymbols}`)
    }

    return stocks
  } catch (error: any | AxiosError) {
    console.log("Failed to fetch stocks")
    throw new Error("")
  }
}

export const registerUser = async (data: RegisterUserArgs) => {
  try {
    // await postRequest(serverEndpoint + "users/", data)
    const requestOptions = {
      method: "POST",
      url: serverEndpoint + "users/",
      data,
    }

    await httpRequest(requestOptions)

    console.log("Success: user registered in registerUser")
  } catch (error: any | AxiosError) {
    console.log("Failed to register user")
    throw new Error("")
  }
}

export const addStock = async (data: AddStockArgs) => {
  try {
    const requestOptions = {
      method: "POST",
      url: serverEndpoint + "users/1/stocks",
      data,
    }

    await httpRequest(requestOptions)

    console.log("Success: stock added in userLanding")
  } catch (error: any | AxiosError) {
    console.log("Failed to add stock")
    throw new Error("")
  }
}

export const removeStock = async (stockSymbol: string, userName: string) => {
  try {
    const requestOptions = {
      method: "DELETE",
      url: serverEndpoint + `users/${userName}/stocks/${stockSymbol}`,
    }

    const response = await httpRequest(requestOptions)

    console.log("Success: stock removed in userLanding", response)
  } catch (error: any | AxiosError) {
    console.log("Failed to remove stock")
  }
}

const httpRequest = async <T>(options: AxiosRequestConfig): Promise<T> => {
  try {
    // const response = await axios.get(endpoint, options)

    const response = await axios.request(options)

    console.log(JSON.stringify(response))

    return response.data
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
