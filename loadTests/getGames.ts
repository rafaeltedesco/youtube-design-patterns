import autocannon from 'autocannon';
async function getGames() {
  const result = await autocannon({
    url: 'http://localhost:3000',
    requests: [
      {
        method: 'GET',
        path: '/games?page=1&limit=10',
      },
      {
        method: 'GET',
        path: '/games?page=2&limit=10',
      },
      {
        method: 'GET',
        path: '/games?page=3&limit=10',
      }
    ],
    duration: 5
  });
  console.log('duration: ', result.duration, 'ms');
  console.log('requests per second in average: ', Math.round(result.requests.average));
  console.table(result.statusCodeStats);
}

getGames();
