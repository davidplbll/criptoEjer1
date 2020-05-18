export const getFirstLetters = (data) => {
  const first = Math.max.apply(
    null,
    Object.keys(data).map((key) => Number(data[key]))
  );
  let dataReturn = {};
  let second = 0;
  for (let key of Object.keys(data)) {
    if (data[key] == first) {
      dataReturn["first"] = { letter: key, value: data[key] };
    } else {
      if (data[key] > second && second < first) {
        second = data[key];
        dataReturn["second"] = { letter: key, value: data[key] };
      }
    }
  }
  return dataReturn;
};

export const remplaceCharacters = (config, text) => {
  for (let conf of config) {
    text = String(text).replace(
      new RegExp(escapeRegExp(conf.replaceLetter), "g"),
      conf.valueLetter
    );
  }
  return text;
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const getDataByRule = (text) => {
  let arrayExport = [...new RegExp(/t[a-z0-9A-Z]e/g).exec(text)];
  arrayExport = [...arrayExport, ...new RegExp(/t[a-z0-9A-Z]/g).exec(text)];
  arrayExport = [...arrayExport, ...new RegExp(/[a-z0-9A-Z]e/g).exec(text)];
  return arrayExport
    .map((symbol) => symbol.replace("t", "").replace("e", ""))
    .reduce((acumulator, value) => {
      if (acumulator != value) acumulator = value;
      return acumulator;
    }, "");
};

export const writeText = (text) => {
  document.getElementById("fistTransform").style.display = "block";
  document.getElementById("textContentFisrt").innerText = text;
};

const words = [
  "THE",
  "TREE",
  "EYE",
  "BY",
  "BRA",
  "GOOD",
  "GLASS",
  "IN",
  "BISHOPS",
  "HOSTEL",
  "DEVILS",
  "SEAT",
  "FORTY",
  "ONE",
  "DEGREES",
  "AND",
  "THIRTEEN",
  "MINUTES",
  "NORTHEAST",
  "NORTH",
  "MAIN",
  "BRANCH",
  "SEVENTH",
  "LIMB",
  "EAST",
  "SIDE",
  "SHOOT",
  "FROM",
  "LEFT",
  "OF",
  "DEATHS",
  "HEAD",
  "BEELINE",
  "THROUGH",
  "SHOT",
  "FIFTY",
  "FEET",
  "OUT",
];

export const ValidatBWords = (letters, allLetters, text) => {
  letters = updateState(letters);
  text = updateText(letters, text);
  let count = 0;
  while (validateNext(text, allLetters)) {
    count++;
    for (let word of words) {
      word = word.toLocaleLowerCase();
      let search = [];
      for (let i in word) {
        let change = word.split("");
        change[i] = "[a-zA-Z0-9.()?*<>&:-]";
        let transformword = change.join("");
        let result = RegExp(transformword, "g").exec(text);
        if (result) {
          result.forEach((palabra) => {
            let characters = palabra.split("");
            let changeLetterFor = characters[i];
            if (
              !allLetters[changeLetterFor] &&
              !seachInfounf(letters, word[i])
            ) {
              characters[i] = word[i];
              palabra = characters.join("");
              if (palabra === word) {
                text = remplaceCharacters(
                  [{ replaceLetter: changeLetterFor, valueLetter: word[i] }],
                  text
                );
              }
              letters[changeLetterFor] = word[i];
            }
          });
        }
      }
      for (let result of search) {
        word
          .split("")
          .forEach((letter) => (result = result.replace(letter, "")));
      }
    }
  }
  document.getElementById("lastTransform").style.display = "block";
  document.getElementById("textContentLast").innerText = text;
};

const validateNext = (text, frecuencyLetterEN) => {
 console.log("text ", text);

  for (let letter of text.split("")){
    if(!frecuencyLetterEN[letter])return true
  }
  console.log("ya")
  return false
};

const updateState = (letters, text) => {
  return (letters = {
    ...letters,
    "5": "a",
    "3": "g",
    "2": "b",
    "<": "o",
    ">": "d",
    "6": "i",
  });
};
const updateText = (letters, text) => {
  return remplaceCharacters(
    Array.from(Object.keys(letters), (key) => ({
      replaceLetter: key,
      valueLetter: letters[key],
    })),
    text
  );
};

const seachInfounf = (letters, letter) => {
  let existentes = {};
  Object.keys(letters).forEach((key) => (existentes[letters[key]] = key));
  return existentes[letter];
};
