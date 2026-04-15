import bcrypt from 'bcrypt';

const password = 'JainStudio2026';
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log('Hash:', hash);
  process.exit(0);
});
