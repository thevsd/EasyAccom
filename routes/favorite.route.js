const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');

router.get('/favorite/:user', favoriteController.getByUser);

router.delete('/favorite/user/:post_id', favoriteController.delete);

module.exports = router;