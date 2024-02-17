import { json } from "@sveltejs/kit";

export const GET = async ({ params: { mode }, fetch, setHeaders }) => {
  const res = await fetch(`/data/${mode}.json`);
  const data = await res.json();
  setHeaders({
    "cache-control": "max-age=31104000",
  });
  return json(data);
};
