const validateStartEnd = (start, end) => (end > start ? true : false);
const isFuture = time => (time > new Date().getTime() ? true : false);

module.exports = { validateStartEnd, isFuture };
