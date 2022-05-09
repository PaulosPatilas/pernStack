const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const id = user.id
    const accessToken = sign(
        { username: user.username, id: user.id },
        "jwtsecretplschange",
       { expiresIn: 3000 }
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers["x-access-token"];
  console.log(accessToken)
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      req.userID = validToken;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };