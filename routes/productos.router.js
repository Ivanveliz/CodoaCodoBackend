const express = require('express');
const router = express.Router();

const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage,
  fileFilter: (req, file, cb) => {
    // console.log(file);
    const fileTypes = /jpg|jpeg|png/

    const mimetype = fileTypes.test(file.mimetype)

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(mimetype & extname) {
      return cb(null, true);
    }

    cb('error: tipo de archivo no soportado')
  },
  limits: {fileSize: 1024 * 1024 * 1}
}); // 1mb

const controller = require('../controllers/productos.controllers');
// const { log } = require('console');

// prefijo: productos
router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/',upload.single('imagen'), controller.store)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy);

module.exports = router;