//If an image is not found, add a default one
export function addDefaultSrc(ev) {
  ev.target.src =
    "https://i.ya-webdesign.com/images/pixel-question-mark-png-5.png";
}

//Add zeros to a number
export function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//Capitalize the first letter of a word
export function capitalize(name) {
  let result = name.charAt(0).toUpperCase() + name.slice(1);
  return result;
}

//Capitalize letters after given character
export function upperCase(word, char) {
  word = capitalize(word).replace("-", char);
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) === char) {
      word =
        word.slice(0, i + 1) +
        word.charAt(i + 1).toUpperCase() +
        word.slice(i + 2);
    }
  }
  return word;
}
