import { json } from "@sveltejs/kit";

export const GET = async ({ fetch, setHeaders }) => {
  const res = await fetch("/data/all.json");
  const data = await res.json();
  setHeaders({
    "cache-control": "max-age=31104000",
  });
  return json(data);
};
