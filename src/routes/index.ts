import { Router } from "express"
import { importDumpData } from "../controllers/employeeController"
import calculateRewards from "../controllers/calcuationController"

const router = Router()

router.get("/", importDumpData)
router.get("/calculate-reward", calculateRewards)

export default router
