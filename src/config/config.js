import dotenv from "dotenv"
import path from "path"

process.DEFAULTS = {}
process.DEFAULTS.page = 1
process.DEFAULTS.limit = 20

dotenv.config({ path: path.join(process.cwd(), ".env") })
