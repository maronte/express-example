/**
 * Returns a plain text hello world response
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {import("express").Response}
 */
function index(req, res) {
    return res.status(200).json({ message: "Hello World!" });
}

module.exports = { index };