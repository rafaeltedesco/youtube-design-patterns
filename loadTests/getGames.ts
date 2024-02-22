import autocannon from 'autocannon';
async function getGames() {
  const result = await autocannon({
    url: 'http://localhost:3000/games',
    amount: 1000,
  });
  console.log('duration: ',result.duration, 'ms');
  console.log('requests per second in average: ', result.requests.average);
  console.table(result.statusCodeStats);
}

getGames();
