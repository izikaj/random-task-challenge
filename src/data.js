const times = (count) => {
  return (new Array(count)).join('|').split('|').map((_, i) => i + 1);
}

const data = {
  flower: {
    title: 'Flower',
    items: times(31).map((i) => `${i}.jpg`),
    prefix: '/flowers/',
  },
  animal: {
    title: 'Animal',
    items: times(31).map((i) => `${i}.jpg`),
    prefix: '/animals/',
  }
}

export default data;
