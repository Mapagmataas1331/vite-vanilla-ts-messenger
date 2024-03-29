import fs from 'node:fs';
import path from 'node:path';

import { partytownVite } from '@builder.io/partytown/utils';
import legacy from '@vitejs/plugin-legacy';

const root = path.resolve(__dirname, 'pages');
const getPages = () => {
  const pages = {};
  const walk = (dir, prefix = '') => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const fullPath = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        const subPrefix = prefix === '' ? dirent.name : dirent.name;
        walk(fullPath, subPrefix);
      } else if (dirent.isFile() && dirent.name.endsWith('.html')) {
        if (dirent.name === 'index.html' && prefix === '') {
          pages['main'] = fullPath;
        } else {
          const pageName =
            dirent.name === 'index.html'
              ? prefix
              : path.parse(dirent.name).name;
          pages[pageName] = fullPath;
        }
      }
    }
  };
  walk(root);
  return pages;
};

// https://vitejs.dev/config/
export default {
  appType: 'mpa',
  base: './',
  root,
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
    alias: [
      { find: '~root', replacement: path.resolve(__dirname) },
      { find: '~pages', replacement: path.resolve(__dirname, 'pages') },
      { find: '~src', replacement: path.resolve(__dirname, 'src') },
      { find: '~assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '~lib', replacement: path.resolve(__dirname, 'src/lib') },
      { find: '~scripts', replacement: path.resolve(__dirname, 'src/scripts') },
      { find: '~styles', replacement: path.resolve(__dirname, 'src/styles') }
    ]
  },
  publicDir: path.resolve(__dirname, 'public')
};
