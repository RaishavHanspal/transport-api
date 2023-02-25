export default {
    port: Number(process.env.PORT) || 3000,
    mongo: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/",
        db: {
            name: "abctransportdb"
        },
        collections: {
            loginCollection: "logincollection"
        }
    }
}