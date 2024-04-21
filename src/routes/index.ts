import { Router } from "express"
import * as CalculationController from "../controllers/calcuationController"

const router = Router()

router.get("/", CalculationController.calculateRewards)

export default router
