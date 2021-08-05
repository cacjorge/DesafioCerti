/**
* @author     Carlos Antonio
* @version    0.1
*/
/*
servidor HTTP que recebe uma requisicao GET e retorna um JSON
com uma chave "extenso", que eh a versao por extenso de um 
numero inteiro enviado no path.
*/

var writtenNumber = require('written-number');

const http = require('http')
const port = 3000
const ip = 'localhost'

const server = http.createServer(function (req, res) {
	var valor=req.url.slice(1);
	var extenso='';
	
	if(valor>=-999999 && valor < 0){
		extenso="menos"+" ";
		extenso+=writtenNumber(valor*(-1), {lang: 'pt'});
		res.writeHead(200, {"context-type":"application/json"});
	    res.write(JSON.stringify({ "extenso": extenso }));
	    res.end();
	}
	else if (valor>=0 && valor<=999999){
			extenso+=writtenNumber(valor, {lang: 'pt'});
			res.writeHead(200, {"context-type":"application/json"});
			res.write(JSON.stringify({ "extenso": extenso }));
			res.end();
		}
    else{
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.write(JSON.stringify( "o numero dever entre -999999 e 999999" ));
		res.end();
        
    }
})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
})
