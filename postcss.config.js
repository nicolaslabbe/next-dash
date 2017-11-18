module.exports = {
  plugins: [
    require("postcss-easy-import")({ prefix: "_" }), // keep this first
    require("autoprefixer")({
      /* ...options */
    }), // so imports are auto-prefixed too
    require("postcss-cssnext")({
      features: {
        autoprefixer: false,
        customProperties: {
          variables: {
            colorPrimary: "#51a9f2"
          }
        }
      }
    })
  ]
};
