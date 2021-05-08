const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router
  .route('/customer')
  .get(customerController.index)
  .post(customerController.store);

router
  .route('/customer/:csmId')
  .get(customerController.show);  

module.exports = router ;  