import "./style.css";
import "./style.scss";
import { textInput } from "./controllers/input.controller";
import { getFrecuencyOfText, frecuencyLetterEN } from "./controllers/frecuency";
import {
  getFirstLetters,
  writeText,
  remplaceCharacters,
  ValidatBWords,
  getDataByRule,
} from "./controllers/convert.controller";
window.onload = () => {
  textInput().subscribe((event) => {
    var dataConversion = {};
    let data = getFrecuencyOfText(event);
    let firstCharacter = getFirstLetters(data);
    let firstLetters = getFirstLetters(frecuencyLetterEN);
    dataConversion[firstCharacter.first.letter] = firstLetters.first.letter;
    dataConversion[firstCharacter.second.letter] = firstLetters.second.letter;
    let newText = remplaceCharacters(
      [
        {
          replaceLetter: firstCharacter.first.letter,
          valueLetter: firstLetters.first.letter,
        },
        {
          replaceLetter: firstCharacter.second.letter,
          valueLetter: firstLetters.second.letter,
        },
      ],
      event
    );
    let caracterTochange = getDataByRule(newText);
    dataConversion[caracterTochange] = "h";
    newText = remplaceCharacters(
      [{ replaceLetter: caracterTochange, valueLetter: "h" }],
      newText
    );
    writeText(newText);
    ValidatBWords(dataConversion,frecuencyLetterEN,newText)
  });
};
