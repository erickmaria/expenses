import { Router } from "express";
import { createExpensesRouter } from "./expenses/create-expenses";
import { listAllExpensesRouter } from "./expenses/list-all-expenses";

const router: Router = Router()

router.use("/expenses", listAllExpensesRouter)
router.use("/expenses", createExpensesRouter)


export default router;