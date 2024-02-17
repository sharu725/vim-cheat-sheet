const getData = async (url, fetch) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  return {
    basic: await getData("/api/modes/basic.json", fetch),
    normal: await getData("/api/modes/normal.json", fetch),
    insert: await getData("/api/modes/insert.json", fetch),
    visual: await getData("/api/modes/visual.json", fetch),
    replace: await getData("/api/modes/replace.json", fetch),
    command: await getData("/api/modes/command.json", fetch),
    terminal: await getData("/api/modes/terminal.json", fetch),
    all: await getData("/api/all.json", fetch),
  };
}
