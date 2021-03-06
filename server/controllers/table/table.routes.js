import express from 'express'
import tableCtrl from './table.controller'
import authCtrl from '../auth/auth.controller'
const router = express.Router()

router.route('/api/table')
  .get(tableCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAdmin ,tableCtrl.create)

router.route('/api/table/:tablePoin')
  .get(tableCtrl.read)
  .put(authCtrl.requireSignin,  authCtrl.hasAdmin ,  tableCtrl.update)
  .delete(authCtrl.requireSignin,  authCtrl.hasAdmin , tableCtrl.remove)

router.route('/api/table/:tablePoin/status').post(authCtrl.requireSignin, tableCtrl.tableStatus)

router.param('tablePoin', tableCtrl.tableByPoin)

export default router