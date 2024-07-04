# React + Vite Template
This is a template with the following: 
* React bundled by Vite:  [https://vitejs.dev/guide/]
* Bootstrap via react-bootstrap:  [https://react-bootstrap.github.io/docs/getting-started/introduction]
* Routing via React-Router [https://reactrouter.com/en/main/start/overview]

## local dev
* $ `nvm use 20`
* $ `npm install`
* $ `npm run dev`

## production deploy to GitHub Pages
### initial setup
* vite.config.js => change base to your GitHub repo name
* GitHub => repo => settings => pages => branch => select 'main' and change from /root to /docs
### deploy
* from branch 'main':
1. $ `npm run build`
2. add changes and push to repo 
