/**
* @author     Carlos Antonio
* @version    0.2
*/
/*
servidor HTTP que recebe uma requisicao GET e retorna um JSON
com uma chave "extenso", que eh a versao por extenso de um 
numero inteiro enviado no path.
*/

const { numExtenso } = require('./numExtenso');

const http = require('http');
const port = 3000;
const ip = 'localhost';

const server = http.createServer((req, res) => {
  	numExt = numExtenso(req.url.substring(1));
    if(numExt == 1){
        res.end("path com formato errado");
    }
    else if (numExt == 2) {
        res.end("o numero dever estar entre -99999 e 99999");
    }
    else{
        res.end('{ \"extenso\": \"' + numExt + '\" }');
    }

})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
})
