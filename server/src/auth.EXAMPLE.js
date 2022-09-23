const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

// express injects next function as parameter
const auth = async (req, res, next) => {
  // the underscore is the word Bearer
  const [_, token] = req.get("authorization").split(" ");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const foundUser = await prisma.user.findFirst({
    where: {
      email: decoded.email,
    },
  });
  req.user = foundUser;

  next();
};

module.exports = auth;
