module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components**/***/*.{js,jsx,ts,tsx}",
    "src/containers**/***/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/dev/**",
    "!**/build/**"
  ],
  resetMocks: true
};