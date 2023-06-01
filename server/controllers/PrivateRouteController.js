const { success } = require("../utils/responseWrapper");

const privateRouteController = async (req, res) => {
    return res.send(success(200, "Protected Route."));
}

module.exports = {privateRouteController};