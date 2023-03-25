const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');

const pipeline = promisify(require('stream').pipeline);

const router = express.Router();

const upload = multer();

router.post('/resume', upload.single('file'), (req, res) => {
  const { file } = req;
  if (!['application/pdf'].includes(file.mimetype)) {
    res.status(400).json({
      message: 'Invalid format'
    });
  } else {
    const filename = `${uuidv4()}${file.mimetype.replace('application/', '.')}`;
    pipeline(
      `${file.buffer}`,
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
    )
      .then(() => {
        res.send({
          message: 'File uploaded successfully',
          url: `/host/resume/${filename}`
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'Error while uploading'
        });
      });
  }
});

router.post('/profile', upload.single('file'), (req, res) => {
  const { file } = req;
  if (!['image/jpg', 'image/png', 'image/jpeg'].includes(file.mimetype)) {
    res.status(400).json({
      message: 'Invalid format'
    });
  } else {
    const filename = `${uuidv4()}${file.mimetype.replace('image/', '.')}`;
    pipeline(
      `${file.buffer}`,
      fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
    )
      .then(() => {
        res.send({
          message: 'Profile image uploaded successfully',
          url: `/host/profile/${filename}`
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'Error while uploading'
        });
      });
  }
});

module.exports = router;
