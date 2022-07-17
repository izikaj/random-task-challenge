const SECOND = 1000;
const MINUTE = 60;
const HOUR = 3600;

export function diff(from, to) {
  const total = Math.floor((to - from) / SECOND);
  const seconds = total % MINUTE;
  const minutes = Math.floor(total / MINUTE) % MINUTE;
  const hours = Math.floor(total / HOUR);
  return {
    total,
    hours,
    minutes,
    seconds,
    hh: `${hours < 10 ? '0' : ''}${hours}`,
    mm: `${minutes < 10 ? '0' : ''}${minutes}`,
    ss: `${seconds < 10 ? '0' : ''}${seconds}`,
  }
}

function timeAgo(from, to) {
  if (!from) return '00:00';
  if (typeof to === 'undefined') to = new Date();
  const {
    hours,
    mm,
    ss
  } = diff(from, to);

  if (hours <= 0) return `${mm}:${ss}`;

  return `${hours}:${mm}:${ss}`;
}

export default timeAgo;
