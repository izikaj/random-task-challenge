const KEY = 'RandomCreatureTask';

export const save = (data = {}) => {
  const raw = JSON.stringify(data);

  localStorage.setItem(KEY, raw);
}

export const load = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};

  return JSON.parse(raw);
}
