import { Router } from 'express'
import ObjectController from '../controllers/object'

const router = new Router()

router.get('/object/:key', ObjectController.getByKeyWithTimestamp)
router.post('/object', ObjectController.createOrUpdate)

export default router