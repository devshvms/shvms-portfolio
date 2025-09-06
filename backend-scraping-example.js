// Example backend service for web scraping (Node.js/Express)
// This would be deployed separately and called by the frontend

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GitHub repository scraping endpoint
app.post('/api/scrape-github', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !url.includes('github.com')) {
      return res.status(400).json({ error: 'Invalid GitHub URL' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const repoData = await page.evaluate(() => {
      return {
        name: document.querySelector('h1 strong a')?.textContent?.trim() || '',
        description: document.querySelector('meta[name="description"]')?.content || '',
        stars: document.querySelector('#repo-stars-counter-star')?.textContent?.trim() || '0',
        forks: document.querySelector('#repo-network-counter')?.textContent?.trim() || '0',
        language: document.querySelector('[data-ga-click="Repository, language filter search"]')?.textContent?.trim() || '',
        lastUpdated: document.querySelector('relative-time')?.getAttribute('datetime') || '',
        topics: Array.from(document.querySelectorAll('.topic-tag')).map(tag => tag.textContent.trim()),
        readme: document.querySelector('#readme')?.textContent?.trim() || ''
      };
    });

    await browser.close();
    
    res.json({ success: true, data: repoData });
  } catch (error) {
    console.error('GitHub scraping error:', error);
    res.status(500).json({ success: false, error: 'Failed to scrape GitHub repository' });
  }
});

// LinkedIn profile scraping endpoint
app.post('/api/scrape-linkedin', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !url.includes('linkedin.com')) {
      return res.status(400).json({ error: 'Invalid LinkedIn URL' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const profileData = await page.evaluate(() => {
      return {
        name: document.querySelector('h1')?.textContent?.trim() || '',
        title: document.querySelector('.text-body-medium.break-words')?.textContent?.trim() || '',
        location: document.querySelector('.text-body-small.inline.t-black--light.break-words')?.textContent?.trim() || '',
        connections: document.querySelector('.t-bold')?.textContent?.trim() || '0',
        summary: document.querySelector('.pv-about__summary-text')?.textContent?.trim() || '',
        experience: Array.from(document.querySelectorAll('.experience-item')).map(exp => ({
          title: exp.querySelector('.experience-item__title')?.textContent?.trim() || '',
          company: exp.querySelector('.experience-item__subtitle')?.textContent?.trim() || '',
          duration: exp.querySelector('.experience-item__duration')?.textContent?.trim() || ''
        })),
        education: Array.from(document.querySelectorAll('.education-item')).map(edu => ({
          school: edu.querySelector('.education-item__school')?.textContent?.trim() || '',
          degree: edu.querySelector('.education-item__degree')?.textContent?.trim() || '',
          year: edu.querySelector('.education-item__year')?.textContent?.trim() || ''
        }))
      };
    });

    await browser.close();
    
    res.json({ success: true, data: profileData });
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    res.status(500).json({ success: false, error: 'Failed to scrape LinkedIn profile' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Scraping service running on port ${PORT}`);
});

// Package.json dependencies for this backend service:
/*
{
  "name": "portfolio-scraping-service",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "puppeteer": "^21.0.0",
    "cheerio": "^1.0.0-rc.12"
  },
  "scripts": {
    "start": "node backend-scraping-example.js",
    "dev": "nodemon backend-scraping-example.js"
  }
}
*/
