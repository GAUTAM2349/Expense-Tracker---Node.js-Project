const jwt = require("jsonwebtoken");
const secret = "ga!ut%g*)(m#$#t~!($%tt";

function setUser(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    secret
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(" an ERROR occured in getUser ", error);
    return false;
  }
}

module.exports = {
  setUser,
  getUser,
};
