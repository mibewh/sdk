module.exports = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
    };

    return config;
  },
  env: {
    repositoryId: "026e69ddefe3a5a6a6cc",
    branchId: "master",
    useAttachmentCache: false
  }
}
