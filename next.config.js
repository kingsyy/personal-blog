/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer")

const nextConfig = {
  output: 'export',
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
  compiler: {
    removeConsole: true,
  }
};

module.exports = withContentlayer({ ...nextConfig });
