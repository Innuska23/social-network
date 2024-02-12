module.exports = {
  // Other Jest configuration options...
  moduleNameMapper: {
    // ...
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!axios/).+\\.js$"],
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
};
