import jwt from "jsonwebtoken"
const checkAuth = (req, res, next) => {

    if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== "JWT" || req.headers.authorization.split(" ")[1] == "") {
        return res.status(403).json({ success: false, message: "jwt token is required" })
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const isTokenValid = jwt.verify(token, process.env.JWTSECRET);
        console.log("isTokenValid", isTokenValid);
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid jwt token" })
    }

    next();

}

export default checkAuth;