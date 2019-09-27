const getLastItemOfPath = path => path.slice(path.lastIndexOf("/") + 1);

const isUserPage = path => {
  let i = path.lastIndexOf("/");
  if (!i) {
    return false;
  }
  if (
    path[i - 1] === "r" &&
    path[i - 2] === "e" &&
    path[i - 3] === "s" &&
    path[i - 4] === "u"
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getLastItemOfPath, isUserPage };
