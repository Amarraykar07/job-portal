import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success:false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false,
            })
        };
        //login se userid yaha milega jo humne token me dala tha
        req.id = decode.userId;
        next(); //next router pe bhejunga
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;