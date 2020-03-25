module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  verbose: true,
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/components/*.{js,vue, ts}", "!**/node_modules/**"],
  coverageReporters: ["html", "text-summary"]
};
