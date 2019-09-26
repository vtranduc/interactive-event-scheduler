const endSpaceRemover = str => {
  const firstIndex = str.split("").findIndex(e => e !== " ");
  return firstIndex === -1
    ? ""
    : str.slice(
        firstIndex,
        str.length -
          str
            .split("")
            .reverse()
            .findIndex(e => e !== " ")
      );
};

module.exports = endSpaceRemover;
