const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('text change', (text) => {
    socket.broadcast.emit('text change', text);
  });

  socket.on('language change', (language) => {
    socket.broadcast.emit('language change', language);
  });

  socket.on('compile', (data) => {
    const { code, language } = data;
    const filename = language === 'cpp' ? 'program.cpp' : 'program.c';
    const output = 'program.exe';

    fs.writeFileSync(filename, code);

    const compileCommand = language === 'cpp' ? `g++ ${filename} -o ${output}` : `gcc ${filename} -o ${output}`;
    exec(compileCommand, (error, stdout, stderr) => {
      if (error) {
        return socket.emit('compile result', { output: stderr });
      }

      const runCommand = `./${output}`;
      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          return socket.emit('compile result', { output: runStderr });
        }

        io.emit('compile result', { output: runStdout });
      });
    });
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data);
  });
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
