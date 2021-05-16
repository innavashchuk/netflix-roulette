module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components**/***/*.{js,jsx,ts,tsx}",
    "src/redux**/***/***/*.{js,jsx,ts,tsx}",
    "src/redux**/***/*.{js,jsx,ts,tsx}",
    "src/redux**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/dev/**",
    "!**/build/**",
    "!src/redux/action-types.ts",
    "!src/redux/store.ts",
    "!**/index.ts"
  ],
  resetMocks: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" 
  }
};