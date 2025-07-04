import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";

export default {
  files: ["**/*.{js,mjs,cjs,jsx}"],

  languageOptions: {
    parser: babelParser,
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: Object.fromEntries(
      Object.entries({
        ...globals.browser,
        ...globals.es2021,
      }).map(([key, value]) => [key.trim(), value]),
    ),
  },

  plugins: {
    js,
    react: pluginReact,
    prettier: pluginPrettier,
    import: pluginImport,
  },

  rules: {
    ...js.configs.recommended.rules,
    ...pluginReact.configs.recommended.rules,

    "prettier/prettier": "error",

    "linebreak-style": "off",

    "react/react-in-jsx-scope": "off",

    "react/prop-types": "off",

    "import/no-unresolved": ["error", { caseSensitive: false }],

    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },

  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },

  ignores: ["node_modules", "dist", "build"],
};
