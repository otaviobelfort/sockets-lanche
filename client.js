const net = require("net");
const readline = require("readline");

const { createReadStream } = require('fs');
const { createInterface } = require('readline');


// aplicação do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// cria um cliente, um socket
const client = new net.Socket();
client.connect(8080,"127.0.0.1",() => {
    //console.log("Clinte conectado");
    //client.write("Olá, sou o cliente ONE! ");

    /*
    client.write("\n");
    client.write("PEDIDO 1 1 \n");
    client.write("\n");
    */
    //
    rl.addListener("line", line => {
        client.write(line);
        //console.log(line);
    });
    //
    
    client.on("data", data => {
        const resposta_server = data.toString();
        console.log(" -- Lanchonete SD -- \n" + resposta_server);
    });

    rl.on("line", line => {
        if(line === "FIM"){
            rl.close();
        }
    });
//
});