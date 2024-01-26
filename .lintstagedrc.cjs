module.exports = {
  '*': 'prettier --ignore-unknown --write --cache',
  '*.ts?(x)': ['eslint --cache --fix'],
};
