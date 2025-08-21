import express from "express";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Hellos"));

app.listen(port, () => {
    console.log(`Server listenin on : ${port}`)
})