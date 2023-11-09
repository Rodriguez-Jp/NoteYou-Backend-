import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let jwToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(jwToken, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.id).select(
        "-password -confirmed -token -createdAt -updatedAt -__v"
      );

      req.user = user;

      return next();
    } catch (error) {
      const err = new Error("There was an error");
      return res.status(403).json({ msg: err.message });
    }
  }

  if (!jwToken) {
    const error = new Error("Invalid token");
    return res.status(401).json({ msg: error.message });
  }
};

export default checkAuth;
