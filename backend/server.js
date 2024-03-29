const app=require("./app");

const dotenv=require("dotenv");
const connectDatabase=require("./config/database");
    
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

//config
dotenv.config({path:"backend/config/config.env"});

connectDatabase();

app.listen(process.env.PORT ,() => {
    console.log(`Server is working on https://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unnhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    });
});
