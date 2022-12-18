const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
// const withSass = require("@zeit/next-sass");
// const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([[withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  images: {
    disableStaticImages: true,
  },
  nextConfig,
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
