const express = require('express');
const customerController = require('../controllers/customerController');
const checkAuth = require('../middleware/jwtMiddleware');

const router = express.Router();

router
  .route('/customer')
  .get([checkAuth.verifyToken],customerController.index)
  .post(customerController.store);

router
  .route('/customer/:csmId')
  .get(customerController.show);  

router
  .route('/customer/login')
  .post(customerController.login);    

router
  .route('/customer/reset')
  .post(customerController.resetPassword);  

router
  .route('/customer/reset/:token')
  .post(customerController.updatePassword);   

module.exports = router ;  