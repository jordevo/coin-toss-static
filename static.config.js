// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

export default {
  entry: "index.js",
  getRoutes: async ({ dev }) => [
    {
      path: "/",
      template: "src/EmptyCase",
    },
    {
      path: "coin",
      template: "src/CoinDefault",
    },
    {
      path: "coin/seventails",
      template: "src/CoinDefaultSeventails",
    },
    {
      path: "trump",
      template: "src/CoinTrump",
    },
    {
      path: "trump/seventails",
      template: "src/CoinTrumpSeventails",
    },
    {
      path: "shapes",
      template: "src/CoinShapes",
    },
    {
      path: "shapes/seventails",
      template: "src/CoinShapesSeventails",
    },
    {
      path: "404",
      template: "src/NotFound",
    },
  ],
};
