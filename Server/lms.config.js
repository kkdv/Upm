// PM2 Ecosystem file to run node.js
// https: //pm2.keymetrics.io/docs/usage/application-declaration/
// pm2 start lms.config.js --env production | development

module.exports = {
    apps: [{
        name: "server",
        script: "server.js",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}