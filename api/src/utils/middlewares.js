import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
   try {
      const accsess_token = req.headers.authorization.split(" ").pop();
      if (!accsess_token) throw new Error('Token faltante');
      const user = jwt.verify(accsess_token, process.env.JWT_SECRET);
      req.user = user;
      next();
   } catch (error) {
      res.json({ success: false, response: error.message });
   }
};