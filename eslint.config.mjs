import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginNoLoops from "eslint-plugin-no-loops";
import eslintPluginEslintComments from "eslint-plugin-eslint-comments";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import eslintRecommended from "@eslint/js";

export default [
  // Base ESLint configuration
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      noInlineConfig: true,
    },
  },

  // Core ESLint recommended rules (with errors instead of warnings)
  {
    ...eslintRecommended.configs.recommended,
    rules: {
      ...eslintRecommended.configs.recommended.rules,
      // Convert warnings to errors
      "no-const-assign": "error",
      "no-this-before-super": "error",
      "no-undef": "off",
      "no-unreachable": "error",
      "constructor-super": "error",
      "valid-typeof": "error",
      "no-duplicate-case": "error",
      // Additional strict rules
      "no-var": "error",
      "prefer-const": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-floating-decimal": "error",
      "no-multi-spaces": "error",
      "no-return-assign": ["error", "always"],
      "no-script-url": "error",
      "no-throw-literal": "error",
      radix: "error",
      yoda: "error",
    },
  },

  // TypeScript ESLint configuration
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2024,
        sourceType: "module",
      },
    },
    rules: {
      // TypeScript recommended rules
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs["recommended-requiring-type-checking"].rules,

      // Strict TypeScript rules
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z]([A-Za-z0-9]+)?(Interface)?$",
            match: true,
          },
        },
        {
          selector: "enum",
          format: ["PascalCase"],
          suffix: ["Enum"],
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/unbound-method": "error",
    },
  },

  // Import plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
    rules: {
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginImport.configs.typescript.rules,
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-named-as-default": "error",
      "import/no-named-as-default-member": "error",
      "import/no-duplicates": "error",
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
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],
      "import/newline-after-import": "error",
      "import/no-mutable-exports": "error",
      "import/no-amd": "error",
      "import/no-commonjs": "error",
      "import/no-nodejs-modules": "off",
      "import/first": "error",
      "import/exports-last": "off",
      "import/no-namespace": "error",
      "import/extensions": ["error", "never"],
      "import/no-unassigned-import": "error",
      "import/no-anonymous-default-export": "error",
      "import/no-named-default": "error",
    },
  },

  // Promise plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      promise: eslintPluginPromise,
    },
    rules: {
      ...eslintPluginPromise.configs.recommended.rules,
      "promise/always-return": "error",
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/catch-or-return": ["error", { terminationMethod: ["catch", "finally"] }],
      "promise/no-native": "off",
      "promise/no-nesting": "error",
      "promise/no-promise-in-callback": "error",
      "promise/no-callback-in-promise": "error",
      "promise/avoid-new": "off",
      "promise/no-new-statics": "error",
      "promise/no-return-in-finally": "error",
      "promise/valid-params": "error",
      "promise/prefer-await-to-then": "error",
      "promise/prefer-await-to-callbacks": "error",
    },
  },

  // Security plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      security: eslintPluginSecurity,
    },
    rules: {
      ...eslintPluginSecurity.configs.recommended.rules,
      "security/detect-object-injection": "off",
      "security/detect-possible-timing-attacks": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "error",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-new-buffer": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-fs-filename": "error",
      "security/detect-non-literal-regexp": "error",
      "security/detect-pseudoRandomBytes": "error",
      "security/detect-unsafe-regex": "error",
    },
  },

  // SonarJS plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      sonarjs: eslintPluginSonarjs,
    },
    rules: {
      ...eslintPluginSonarjs.configs.recommended.rules,
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/no-unused-collection": "error",
      "sonarjs/no-use-of-empty-return-value": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-single-boolean-return": "error",
    },
  },

  // Unicorn plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          ignore: ["README.md"],
        },
      ],
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-structured-clone": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-useless-undefined": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-method-this-argument": "off",
      "unicorn/no-null": "error",
      "unicorn/no-static-only-class": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unused-properties": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/no-array-callback-reference": "off",
    },
  },

  // No Loops plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "no-loops": eslintPluginNoLoops,
    },
    rules: {
      "no-loops/no-loops": "error",
    },
  },

  // ESLint comments plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "eslint-comments": eslintPluginEslintComments,
    },
    rules: {
      ...eslintPluginEslintComments.configs.recommended.rules,
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/require-description": ["error", { ignore: [] }],
      "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
      "eslint-comments/no-unlimited-disable": "error",
    },
  },

  // Unused imports plugin configuration
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Prettier plugin configuration - keep at the end to override conflicting rules
  {
    files: ["**/*.{js,jsx,ts,tsx,md,yml}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          trailingComma: "es5",
          printWidth: 100,
          tabWidth: 2,
        },
      ],
    },
  },

  // Apply eslint-config-prettier to disable rules that conflict with Prettier
  eslintConfigPrettier,

  // Ignore patterns
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      ".next/",
      "out/",
      ".cache/",
      "public/",
      "*.min.js",
      "*.d.ts",
      "*.json",
      "*.md",
      ".vscode/*",
    ],
  },
];
