const multer = require("multer");
const path = require("path");

const CLIENT_MAX_BODY_SIZE = 100000;
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
  limits: { fileSize: CLIENT_MAX_BODY_SIZE },
});
module.exports = upload;
