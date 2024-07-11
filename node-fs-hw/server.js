const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  if (request.url === '/create-directory') {
    fs.mkdir('content', (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        response.writeHead(500);
        response.end('Error creating directory');
      } else {
        console.log('content folder created');
        response.writeHead(200);
        response.end('content folder created');
      }
    });
  } 
  else if (request.url === '/create-text') {
    fs.writeFile('randomText.txt', 'This is some random text.', (err) => {
      if (err) {
        console.error('Error creating file:', err);
        response.writeHead(500);
        response.end('Error creating file');
      } else {
        console.log('randomtext.txt created');
        response.writeHead(200);
        response.end('randomtext.txt created');
      }
    });
  } 
  else if (request.url === '/new-folder-and-file') {
    fs.readFile('randomText.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        response.writeHead(500);
        response.end('Error reading file');
      } else {
        fs.writeFile('content/verbage.txt', data, (err) => {
          if (err) {
            console.error('Error creating verbage.txt:', err);
            response.writeHead(500);
            response.end('Error creating verbage.txt');
          } else {
            console.log('verbage.txt created');
            response.writeHead(200);
            response.end('verbage.txt created');

            // Set timeout to delete content directory after 7 seconds
            setTimeout(() => {
              fs.rm('content', { recursive: true }, (err) => {
                if (err) {
                  console.error('Error deleting content directory:', err);
                } else {
                  console.log('content directory deleted');
                }
              });
            }, 7000);
          }
        });
      }
    });
  } 
  else {
    response.writeHead(404);
    response.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});