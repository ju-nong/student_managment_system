const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
<<<<<<< HEAD
                "@router": path.join(__dirname, "src/router"),
                "@store": path.join(__dirname, "src/store"),
                "@pages": path.join(__dirname, "src/pages"),
                "@components": path.join(__dirname, "src/components"),
                "@views": path.join(__dirname, "src/components/views"),
=======
                "@components": path.join(__dirname, "src/components"),
                "@router": path.join(__dirname, "src/router"),
                "@store": path.join(__dirname, "src/store"),
>>>>>>> 27f5a1464d4f73fa90487ad8017425ca64b03162
                "@teleport": path.join(__dirname, "src/teleport"),
            },
            extensions: [".js", ".vue", ".json"],
        },
    },
    css: {
        loaderOptions: {
            sass: {
<<<<<<< HEAD
                additionalData: `@import "~@/assets/scss/style.scss";`,
=======
                additionalData: `
                    @import "~@/assets/scss/style.scss";
                `,
>>>>>>> 27f5a1464d4f73fa90487ad8017425ca64b03162
            },
        },
    },
});
