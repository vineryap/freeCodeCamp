function isValidDate(date) {
  const validDateRegex =
    /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
  return (
    !isNaN(new Date(parseInt(date)).getTime()) ||
    !isNaN(Date.parse(date)) ||
    !isNaN(new Date(date).getTime()) ||
    validDateRegex.test(date)
  );
}

module.exports = { isValidDate };
