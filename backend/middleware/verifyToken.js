import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies)
    if(!token) return res.status(401).json({success: false, message: "Unauthorized - no token provideddddddd"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({success: false, message: "Unauthorized - no token provided"})
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({success: false, message: "Server error"});
    }
}