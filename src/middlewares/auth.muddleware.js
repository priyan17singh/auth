import jwt from "jsonwebtoken";

export async function authArtist(req, res, next) {
    const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorised" });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "artist") {
          return res
            .status(403)
            .json({ message: "You don't have access." });
        }
        req.user = decoded;
        next();
    
      } catch (error) {
        console.error("Upload error details:", error);
        return res.status(401).json({ message: "Unauthorised" });
      }
}

export async function userM(req, res, next) {
    const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorised" });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "artist" && decoded.role != "user") {
          return res
            .status(403)
            .json({ message: "You don't have access." });
        }
        req.user = decoded;
        next();
    
      } catch (error) {
        console.error("Upload error details:", error);
        return res.status(401).json({ message: "Unauthorised" });
      }
}





export default authArtist;