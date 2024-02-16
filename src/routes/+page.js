const getData = async (url, fetch) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  return {
    basic: await getData("/api/basic.json", fetch),
    all: await getData("/api/all.json", fetch),
  };
}
