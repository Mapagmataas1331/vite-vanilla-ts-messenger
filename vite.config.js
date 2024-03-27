import fs from 'node:fs';
import path from 'node:path';

import { partytownVite } from '@builder.io/partytown/utils';
import legacy from '@vitejs/plugin-legacy';

import _config from './_config.js';

const HOST = _config.server.host;
const PORT = _config.server.port;

const root = path.resolve(__dirname, 'pages');
const getPages = () => {
  const pages = { main: path.resolve(root, 'index.html') };
  fs.readdirSync(root, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .forEach((page) => {
      pages[page] = path.resolve(root, page, 'index.html');
    });
  return pages;
};

// https://vitejs.dev/config/
export default {
  appType: 'mpa',
  base: './',
  root,
  server: {
    host: HOST,
    port: PORT
  },
  plugins: [
    legacy(),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: getPages()
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
};
