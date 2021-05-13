const { users, token } = require('./../models/');


const isAdminMiddleware = (req, res, next) => {
    token.findByToken(req.headers.authorization).then(response => {
        users.findById(response[0].userId).then(response => {
        if (response[0].isAdmin) {
            next();
        } else {
            res.status(403).send("Not authorized for such an operation");
        }
        }).catch(err => {
            res.status(404).send("User not Found");
        })
    }).catch(err => {
        console.log("Token not recognized", err);
        res.status(403).send("Failed to do the operation");
    });
}

module.exports = isAdminMiddleware;