const fs = require('fs-extra');
const path = require('path');

async function createDirectory(dir) {
  await fs.ensureDir(dir);
}

async function writeFile(filePath, data) {
  await fs.writeFile(filePath, data, 'utf8');
}

module.exports = { createDirectory, writeFile };
