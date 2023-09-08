const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/convert', async (req, res) => {
  try {
    const toConvert = req.body.toConvert;

    const conversions = [];

    for (const item of toConvert) {
      const amount = item.amount;
      const from = (item.from).toLowerCase();
      const toCurrencies = item.to;

      for (const toCurrency of toCurrencies) {
        const conversionAPI = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${(toCurrency).toLowerCase()}.json`;
        const response = await fetch(conversionAPI);
        const data = await response.json();
        console.log(data);

        conversions.push({
          amount: amount,
          from: from,
          exchangeValues: [
            {
              to: toCurrency,
              value: amount*data[toCurrency.toLowerCase()],
            },
          ],
        });
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ conversions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
