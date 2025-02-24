const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/browse', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load page' });
  }
});

app.listen(port, () => {
  console.log(`Browserless Proxy is running on http://localhost:${port}`);
});
