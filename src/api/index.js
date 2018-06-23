import { Router } from 'express'
import ObjectController from '../controllers/ObjectController'

const router = new Router()

router.get('/object/:key', ObjectController.getByKeyAndTimestamp)
router.post('/object', ObjectController.createOrUpdate)

export default router