const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../src/content/news');

fs.readdirSync(postsDir).forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        if (!content.includes('pubDate:')) {
            content = content.replace(
                '---\n',
                `---\npubDate: "${new Date().toISOString()}"\n`
            );
        }

        if (!content.includes('updatedDate:')) {
            content = content.replace(
                '---\n',
                `---\nupdatedDate: "${new Date().toISOString()}"\n`
            );
        }

        fs.writeFileSync(filePath, content);
    }
});