module.exports = {
  "extends": [
    "airbnb",
  ],
  "parser": "babel-eslint",
  "globals": {
    "test" : true,
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules" : {
    "new-cap": 0,
    "no-case-declarations": 0,
    "no-nested-ternary": 0,
    "no-underscore-dangle": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/jsx-filename-extension": 0,
    "react/no-unused-prop-types": 1,
    "react/prop-types": 0,
    "react/prefer-stateless-function": 1,
    "no-mixed-operators": 1,
    "import/first": 1,
    "import/prefer-default-export": 1,
    "comma-dangle": 1,
    "linebreak-style": 0,
    "no-plusplus": 0,
    "arrow-body-style": 0,
  }
};