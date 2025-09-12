import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'node_modules/',
      'dist/',
      '**/**/.cache/',
      '**/**/.temp/',
      '**/**/dist/',
    ],
  },
  // 先加载推荐配置
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  js.configs.recommended,
  // 再加载自定义配置，这样可以覆盖推荐配置中的规则
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // https://eslint.org/docs/latest/rules
      '@typescript-eslint/no-this-alias': 'off',
      'no-console': [
        'warn',
        {
          allow: [
            'warn',
            'error',
            'info',
            'group',
            'groupCollapsed',
            'groupEnd',
            'table',
          ],
        },
      ],
      // 禁止使用嵌套的三元表达式
      'no-nested-ternary': 'error',
      // 调用构造函数必须带括号
      'new-parens': 'error',
      // this别名
      'consistent-this': ['error', '_this'],
      // 对象中的属性和方法使用简写
      'object-shorthand': 'error',
      // 不要省括号
      curly: 'error',
      // switch
      'default-case': 'error',
      // const
      'prefer-const': 'error',
      // 模板字符串
      'prefer-template': 'error',
    },
  },
]);
