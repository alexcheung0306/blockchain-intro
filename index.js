const axios = require('axios');
const fs = require('fs');
const portfolio = JSON.parse(fs.readFileSync('portfolio.json', 'utf8'));

const calculatePortfolioValue = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');

  let totalValue = 0;
  for (const [coin, amount] of Object.entries(portfolio)) {
    const price = response.data[coin].usd;
    const value = amount * price;
    totalValue += value;
    console.log(`${coin}: ${amount} coins = $${value.toFixed(2)}`);
  }
  console.log(`Total portfolio value: $${totalValue.toFixed(2)}`);
};




async function main() {
  // Add this to your main function
  setInterval(async () => {
    console.clear();
    console.log('Updated at:', new Date().toLocaleTimeString());
    await calculatePortfolioValue();
  }, 15000); // Updates every 15 seconds
  //   console.log('Fetching portfolio value...');
  //   await calculatePortfolioValue();
}

main();
