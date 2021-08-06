/* 
funcao que recebe uma string que representa um numero entre
[-99999,99999] e retorna uma string com o numero por numExttenso
@param  num     string que representa um numero
@return         string com numero de entrada por extenso.
                Para erros, 
				retorna 1, caso a entrada esteja errada e
				retorna 2, caso a entrada não esteja entre -99999 e 99999.
*/
const numExtenso = (num) => {
	var saida = "";
	var entrada = num.length; //tamanho da entrada
	var usaE = 0; //flag para saber se a proxima palavra necessita de "e "
	var numExt = [ //especificando os numeros por extenso
        ["", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
    ];

    //tratamento de entradas inválidas
    var i = 0;
    if (num[i] == '-') {
        i++        
    }
    while (i < entrada) {// verificando se são realmente numeros no path
        var numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        
        for (var j = 0; j < 10; j++) {
            if (num[i] == numeros[j]) {
                break;
            }
        }
        if (j>9) {
			//retorna 1 significando que o path está incorreto
            return 1;
        }
        i++;
    }
    if ((entrada>6 && num[0]=='-') || (entrada>5 && num[0]!='-')) {
        //retorna 2 significando que o valor não está entre -99999 e 99999
		return 2;
    }

    //tratamento se a entradas é "zero" para todos os casos
    if (num=="0" || num=="00" || num=="000" || num=="0000" || num=="00000" || num=="-0" || num=="-00" || num=="-000" || num=="-0000"  || num=="-00000") {
        return "zero";
    }

    //tratamento do valor negativo
    if (num[0] == '-') {
    	saida = saida + "menos ";
    	num = num.substring(1);
    	entrada -= 1;
    }
	
    //tratamento para caso a string de entrada tenha entrada 5
	if (entrada == 5) {
		//adicionando de vinte a noventa
		if(num[0] != '1' && num[0] != '0'){
			saida = saida + numExt[1][Number(num[0]) - 1] + " ";
			//adicionando "e um" ate "e nove"
			if (num[1] != '0') {
				saida = saida + "e " + numExt[0][Number(num[1])] + " ";  
			}
            saida = saida + "mil";
            usaE = 1;
		}
		
		//adicionando de onze a dezenove
		else if(num[0] != '0'){
			saida = saida + numExt[0][Number(num[1]) + 10] + " ";
            saida = saida + "mil";
            usaE = 1;
		}
		//se primeiro dígito for zero
		else {
            //se o segundo dígito for diferente de zero
            if (num[1] != '0') {
                saida = saida + numExt[0][Number(num[1])] + " ";
                saida = saida + "mil";
                usaE = 1;
            }
		}
		entrada = 3;
		num = num.substring(2);
	}
    //tratamento para caso a string de entrada tenha entrada 4
	else if (entrada == 4) {
		if (num[0]!='0' && num[0]!='1') {
			saida = saida + numExt[0][Number(num[0])] + " ";
			saida = saida + "mil";
			usaE = 1;
		}
        else if (num[0]=='1') {
            saida = saida + "mil";
            usaE = 1;
        }
		num = num.substring(1);
    	entrada = 3;
    }

    //tratamento para caso a string de entrada tenha entrada 3
    if (entrada == 3) {
    	if (usaE==1 && num!="000") {
    		saida = saida + " e ";
    		usaE = 0;
    	}
    	if (num == "100"){
    		saida = saida + "cem";
    	}
        else if(num[1]=='0' && num[2]=='0'){
            saida = saida + numExt[2][Number(num[0])];
        }
    	else{
    		saida = saida + numExt[2][Number(num[0])];
    		if(num[0]!='0'){
                usaE = 1;
            }
    		num = num.substring(1);
    		entrada = 2;
    	}

    }
    //tratamento para caso a string de entrada tenha entrada 2
    if (entrada == 2) {
    	if (usaE==1 && num!="00") {
    		saida = saida + " e ";
    		usaE = 0;
    	}
        if(num[0] == '0'){
            num = num.substring(1);
            entrada = 1;
        }
    	//adicionando de vinte a noventa
    	else if(num[0] != '1' && num[0] != '0'){
    		saida = saida + numExt[1][Number(num[0]) - 1];
            usaE = 1;
            num = num.substring(1);
            entrada = 1;
    	}
    	//adicionando de onze a dezenove
    	else if(num[0] != '0'){
    		saida = saida + numExt[0][Number(num[1]) + 10];
    	}
    }

    //tratamento para caso a string de entrada tenha entrada 1
    if (entrada == 1) {
        if (usaE==1 && num!="0") {
            saida = saida + " e ";
            usaE = 0;
        }
    	saida = saida + numExt[0][Number(num[0])];
    }

    return saida;

}

exports.numExtenso = numExtenso;