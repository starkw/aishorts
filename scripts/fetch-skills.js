// 抓取 skills.sh 前100个热门技能
const https = require('https');

async function fetchSkills() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'skills.sh',
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // 解析HTML，提取技能数据
        const skills = [];
        
        // 使用正则表达式提取技能信息
        // 格式：<tr>...</tr> 包含技能名称、安装数等
        const skillRows = data.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
        
        for (let i = 0; i < Math.min(100, skillRows.length); i++) {
          const row = skillRows[i];
          
          // 提取技能名称和仓库路径
          const nameMatch = row.match(/<a[^>]*href="[^"]*"[^>]*>([^<]+)<\/a>/);
          const repoMatch = row.match(/href="[^"]*\/([^\/]+\/[^\/"]+)/);
          
          // 提取安装数
          const installMatch = row.match(/([\d.]+[KM]?)\s*installs?/i);
          
          if (nameMatch && repoMatch) {
            const name = nameMatch[1].trim();
            const repo = repoMatch[1].trim();
            const installs = installMatch ? installMatch[1] : '0';
            
            skills.push({
              name: name,
              repo: repo,
              installCmd: `npx skillsadd ${repo}`,
              installs: installs,
              description: `${name} - 来自 skills.sh 官方技能市场`
            });
          }
        }
        
        resolve(skills);
      });
    }).on('error', reject);
  });
}

fetchSkills().then(skills => {
  console.log(JSON.stringify(skills, null, 2));
}).catch(err => {
  console.error('Error:', err);
});
