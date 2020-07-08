
exports.getDate = function() {
  const today = new Date(); // initialize varaibel to day to the Date Object

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getDay = function() {
  const today = new Date(); // initialize varaibel to day to the Date Object

  const options = {
    weekday: "long"
  };

  return day = today.toLocaleDateString("en-US", options);
};

console.log(module.exports);
