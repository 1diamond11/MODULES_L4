require('dotenv').config();
const sortStrings = require('./modules/sortStrings');
const fetchData = require('./modules/fetchData');
const { createDirectory, writeFile } = require('./modules/fileSystem');
const hashPasswords = require('../src/libs/hashPasswords');

console.log(`Текущий режим работы: ${process.env.MODE}`);

const passwords = Array.from({ length: 13 }, (_, i) => `password${i + 1}`);
hashPasswords(passwords);

fetchData('https://jsonplaceholder.typicode.com/users')
  .then(async (result) => {
    if (result.error) {
      console.error('Ошибка загрузки данных:', result.error);
      return;
    }

    console.log('Данные загружены!');

    const names = result.data.map(user => user.name);
    const sortedNames = sortStrings(names);

    const usersDir = './users';
    await createDirectory(usersDir);

    await writeFile(`${usersDir}/names.txt`, sortedNames.join('\n'));
    await writeFile(`${usersDir}/emails.txt`, result.data.map(user => user.email).join('\n'));

    console.log('Файлы созданы!');
  });
