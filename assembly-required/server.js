// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(bodyParser.text());

app.post('/run-assembly', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});