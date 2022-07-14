const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
                "@router": path.join(__dirname, "src/router"),
                "@store": path.join(__dirname, "src/store"),
                "@pages": path.join(__dirname, "src/pages"),
                "@assets": path.join(__dirname, "src/assets"),
                "@components": path.join(__dirname, "src/components"),
                "@area": path.join(__dirname, "src/components/area"),
                "@views": path.join(__dirname, "src/components/views"),
                "@teleport": path.join(__dirname, "src/teleport"),
            },
            extensions: [".js", ".vue", ".json"],
        },
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/assets/scss/style.scss";`,
            },
        },
    },
});
