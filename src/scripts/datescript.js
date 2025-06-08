// scripts/updateDates.js
import fs from 'fs';
import path from 'path';

const postsPath = './content/news';
fs.readdirSync(postsPath).forEach(file => {
  const filePath = path.join(postsPath, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!content.pubDate) {
    content.pubDate = new Date().toISOString();
  }
  if (!content.updateDate) {
    content.updateDate = new Date().toISOString();
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
});
