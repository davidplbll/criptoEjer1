import "./style.css";
import "./style.scss";
import { textInput } from "./controllers/input.controller";
import { getFrecuencyOfText } from "./controllers/frecuency";
window.onload = () => {
  textInput().subscribe((event) => {
    console.log("event ", event);
    console.log(getFrecuencyOfText(event));
  });
};
