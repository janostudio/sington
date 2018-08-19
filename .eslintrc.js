// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',// 继承aribnb的配置
  // add your custom rules here 0表示关闭规则
  'rules': {
    'global-require': 0,
    'import/first': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-multi-assign': 0,
    'no-undef': 0,
    'max-len': 0, // 最大长度
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'func-names': ["error", "never"],
    'func-names': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'no-plusplus': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-await-in-loop': 'off',
  }
}
