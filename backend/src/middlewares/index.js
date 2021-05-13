const authMiddleware = require("./authMiddleware");
const isAdminMiddleware = require("./isAdminMiddleware");
const uploadFile = require("./multerMiddleware");

module.exports = {
    authMiddleware,
    isAdminMiddleware,
    uploadFile
}