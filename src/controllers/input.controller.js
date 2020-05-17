import { fromEvent } from "rxjs";
import { tap, map } from "rxjs/operators";

export const textInput = () => {
  const btn = document.getElementById("btn");
  return fromEvent(btn, "click").pipe(
    tap(console.log),
    map(() => document.getElementById("codigo")),
    map((element) => element.value)
  );
};
