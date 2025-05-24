const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivos.controller');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('archivo'), archivosController.upload);
router.get('/caso/:casoId', archivosController.getByCaso);
router.delete('/:id', archivosController.delete);

module.exports = router; 