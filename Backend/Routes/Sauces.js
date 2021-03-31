const express = require('express');
const router = express.Router();

const auth = require('../Middleware/auth');
const multer = require('../Middleware/multer-config');

const saucesCtrl = require('../controllers/saucesctrl');

router.get('', auth, saucesCtrl.getAllStuff)
router.post('', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.post('/:id/like', auth, saucesCtrl.like)
router.put('/:id', auth, multer, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

module.exports = router;