// @ts-check
// @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  checkers: ["typescript"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  ignorePatterns: [".devenv*", ".direnv"],
};
export default config;
