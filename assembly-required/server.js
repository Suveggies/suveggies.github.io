// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.disable('x-powered-by');
app.use(bodyParser.text());

const csurf = require("csurf");

const limit = require("express-limit").limit;

app.post('/run-assembly', (req, res) => {

    const rateLimiter = require('../controls/rate-limiter')({

        // Allow 3 submits, then slows down

        freeRetries: 30,

        minWait: 2 * 60 * 60,

        maxWait: 2 * 60 * 60,

        lifetime: 60 * 60
    
    });

    const assemblyCode = req.body;

    // Compile assembly code
    exec(`nasm -f elf64 -o program.o -`, (err, stdout, stderr) => {
        if (err) {
            res.status(500).send('Error compiling assembly code');
            return;
        }

        // Execute machine code
        exec(`ld -o program program.o && ./program`, (err, stdout, stderr) => {
            if (err) {
                res.status(500).send('Error executing machine code');
                return;
            }

            // Send output to frontend
            res.send(stdout);
        });
    }).stdin.write(assemblyCode);
});

app.use(csurf());



app.use(function(req, res, next) {

    res.cookie("mytoken", req.csrfToken());

    next();

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});