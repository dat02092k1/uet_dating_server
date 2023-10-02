import {app} from "./src/app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server start with ${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit Server Express'));
})