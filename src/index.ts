import dotenv from "dotenv"
import app from "./app"

const result = dotenv.config()

if (result.error) {
  dotenv.config({ path: ".env.default" })
}

const PORT = process.env.PORT || 3000

const serve = () =>
  app.listen(PORT, () => {
    console.log(`Task Api listening on port  https://localhost:${PORT}`)
  })

serve()
