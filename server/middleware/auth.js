import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        console.log(token)
        console.log(req.headers)
        console.log(req.header)
        console.log("verifying")
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const generateAuthToken = (user) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, phone: user.phone }, jwtSecretKey);
    return token;
};

export const adminToken = (data) => {
    console.log(data, "token data");
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: data._id, email: data.email }, jwtSecretKey);
    return token;
};

export const generateAuthTokenOwner = (owner) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: owner._id, name: owner.name, email: owner.email, phone: owner.phone }, jwtSecretKey);
    return token;
};
