module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", ["@babel/preset-env"]],
  env: {
    test: {
      presets: [["env", { targets: { node: "current" } }]]
    }
  }
};
