const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/file-upload');
const postController = require('../controllers/blog.controller');
const checkAuth = require('../middleware/check-auth');

router.get('/', postController.getAll);
router.get('/:post_id', postController.getById);
router.get('/user/:user', postController.getByUser);

router.use(checkAuth);

router.post('/create', fileUpload.single('cover'), postController.create);
router.delete('/:post_id', postController.delete);
router.post('/:post_id', fileUpload.single('cover'), postController.update);

module.exports = router;
