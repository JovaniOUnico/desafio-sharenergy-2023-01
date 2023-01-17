import { Router } from 'express'
import { userController } from './controller/UserController'
import { clientController } from './controller/ClientController';

//const verifyToken = require('./middleware/auth')

const router = Router();

router.get('/', function(_req, res) {
  res.send('hello world');
});

router.get('/user/list', userController.list);
router.post('/user/new', userController.create);
router.post('/user/login', userController.login);
router.post('/user/verify', userController.verify);
router.post('/user/logout', userController.logout);

router.get('/client/list', /* verifyToken, */ clientController.list )
router.post('/client/new', /* verifyToken, */ clientController.create)
router.put('/client/edit/:id', /* verifyToken, */ clientController.edit)
router.delete('/client/remove/:id', /* verifyToken, */ clientController.remove)

export default router