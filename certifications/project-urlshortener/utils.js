function makeRandomId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isValidURL(string) {
  let url;
  const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return (
    (url.protocol === "http:" ||
      url.protocol === "https:" ||
      url.protocol === "ftp:") &&
    urlRegex.test(string)
  );
}

module.exports = {
  makeRandomId,
  isValidURL,
};
