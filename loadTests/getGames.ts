import autocannon from 'autocannon';
async function getGames() {
  const result = await autocannon({
    url: 'http://localhost:3000/games',
    amount: 1000,
  });
  console.table(result.statusCodeStats);
}

getGames();
