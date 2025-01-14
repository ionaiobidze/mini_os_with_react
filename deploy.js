const simpleGit = require('simple-git');
const path = require('path');

const git = simpleGit();
const buildPath = path.resolve(__dirname, 'build');

async function deploy() {
  try {
    await git.init();
    await git.addRemote('origin', 'https://github.com/ionaIobidze/severity-ai-website.git');
    await git.checkout('gh-pages');
    await git.add(buildPath);
    await git.commit('Automated deployment');
    await git.push('origin', 'gh-pages', { '--force': null });
    console.log('Deployment successful');
  } catch (err) {
    console.error('Deployment failed:', err);
  }
}

deploy();
