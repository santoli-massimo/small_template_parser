process.env.BABEL_ENV = 'test';

module.exports = function (wallaby) {
    return {
      files: [
        'src/**/*.js'
      ],
      tests: [
        'test/**/*.js'
      ],
      env: {
        type: 'node',
        runner: 'node'
      },
      testFramework: 'jest',
      preprocessors: {
        '**/*.js?(x)': file => require('babel-core').transform(
          file.content, {
            sourceMap: true,
            "presets": ["babel-preset-env", "stage-0"],
            "plugins": ["transform-object-rest-spread"]
          })
      },
    };
  };