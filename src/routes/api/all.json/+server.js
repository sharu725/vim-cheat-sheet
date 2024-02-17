import { json } from "@sveltejs/kit";
import basic from "../../../../static/data/basic.json";
import normal from "../../../../static/data/normal.json";
import visual from "../../../../static/data/visual.json";
import insert from "../../../../static/data/insert.json";
import replace from "../../../../static/data/replace.json";
import terminal from "../../../../static/data/terminal.json";

export const GET = async ({ fetch, setHeaders }) => {
  const data = Object.assign(basic, normal, visual, insert, replace, terminal);

  setHeaders({
    "cache-control": "max-age=31104000",
  });
  return json(data);
};
