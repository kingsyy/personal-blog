/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")

const nextConfig = {
    output: 'export',
    images: {
      loader: 'custom',
      loaderFile: './src/components/image-loader.js'
    },
    compiler:{
        removeConsole: true,
    }
};

module.exports = withContentlayer({ ...nextConfig });
