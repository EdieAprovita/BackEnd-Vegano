const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return.jwt.sign({id},process.JWT_SECRET, {
        expiresIn: "30d",
    })
}

export default generateToken