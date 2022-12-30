import { verifyToken } from "../functions/tokenFunctions.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("ax-auth-token");

    if (!token)
      return res.status(401).json({ error: "No Auth Token, Access Denied" });

    const verified = verifyToken(token);

    if (!verified)
      return res
        .status(401)
        .json({ error: "Token Verification Failed, Authroziation Denied" });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { authMiddleware };
