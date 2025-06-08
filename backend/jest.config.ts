import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm", // Use the ESM preset for better compatibility
  testEnvironment: "node",
  transform: { "\\.[jt]sx?$": ["ts-jest", { useESM: true }] },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // More precise mapping for relative .js imports
  },
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
