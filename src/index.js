import "./style.css";
import "./style.scss";
import { textInput } from "./controllers/input.controller";
window.onload = () => {
  textInput().subscribe((event) => {
    console.log("event ", event);
  });
};
