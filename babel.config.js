module.exports = {
  presets: ['module:@react-native/babel-preset', "nativewind/babel"],

  plugins: [["module-resolver", {
    root: ["./"],
    extensions: [".js", ".ts", ".tsx", ".jsx"],

    alias: {
      "@": "./"
    }
  }]]
};
