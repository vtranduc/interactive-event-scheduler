const cookieEncrypt = email => {
  return email;
};

// This function must return null for invalid cookie

const cookieDecrypt = function(cookie) {
  const email = cookie;
  return email;
};

module.exports = { cookieEncrypt, cookieDecrypt };
