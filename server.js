const net = require("net");
const readline = require("readline");

const { createReadStream } = require('fs');
const { createInterface } = require('readline');

// instancia do servidor, cria uma servidor
// será executado toda vez que receber uma requisição de sockets, de um cliente
function handleConnection(socket){

    // quando se recebe dados cliente
    socket.on("data", function (data) {

        // retorna se um cliente se conentou
        console.log("Um cliente se conectou! ");

        // quando o cliente se desconectar
        //
        socket.on("end", () => {
            // posso ter acesso ao sockets e inspecionar as mensagens que transitam nele

            // retorna se um cliente se desconentou
            console.log("Um cliente se desconectou");
        });

        
        // dados do cardapio
        const bd_massa = [
            {
                nome: "Mini Pizza Calabreza",
                preco: 5.0,
            },
            {
                nome: 'Pastel Carne Seca',
                preco: 6.0,
            },
            {
                nome: "Pastel Queijo",
                preco: 5.0,
            },
            {
                nome: "Churrus",
                preco: 3.0,
            },
            {
                nome: "Bomba",
                preco: 7.0,
            },
            {
                nome: "Torta de chocolate",
                preco: 10.0,
            },
            
        ];
        const bd_bebida = [
            {
                nome: "Refrigerante Guaraná Jesus - 2L",
                preco: 8.0,
            },
            {
                nome: 'Refrigerante Coca Cola',
                preco: 10.0,
            },
            {
                nome: "Suco de Abacaxi",
                preco: 10.0,
            },
            {
                nome: "Suco de Cupu",
                preco: 10.0,
            },
        ];


        const input_client = data.toString().trim();

        const parametros = input_client.split(" ");

        const commando = parametros[0];
        const massa = parseInt(parametros[1]);
        const bebida = parseInt(parametros[2]);

        //console.log(data.toString());
        //client.write("PEDIDO 1 1 \n");
        //client.write("CARDAPIO \n");
        switch (commando) {
            case "PEDIDO":
                socket.write( "\n---- PEDIDO ---- " + "\n" + 
                JSON.stringify(bd_massa[massa].nome) + ", R$ " + JSON.stringify(bd_massa[massa].preco) + ",00 \n" + 
                JSON.stringify(bd_bebida[bebida].nome) + ", R$ " + JSON.stringify(bd_bebida[bebida].preco) + ",00"); 
                break;
            case "CARDAPIO":
                socket.write("---- MASSAS ----");
                for(i = 0; i<bd_massa.length;i++){
                    socket.write(JSON.stringify(bd_massa[i].nome) + ", R$ " + JSON.stringify(bd_massa[i].preco) + ",00 \n"); 
                }
                socket.write("---- BEBIDAS ----\n");
                for(j = 0; j<bd_bebida.length;j++){
                    socket.write(JSON.stringify(bd_bebida[j].nome) + ", R$ " + JSON.stringify(bd_bebida[j].preco) + ",00\n"); 
                }
                break;
            case "APAGAR":
                
                break;
            case "CADASTRAR":
                
                break;
            case "SAIR":
                
                break;
            default:
                socket.write("");
        }    
        
        });
}

function main(){

    const server = net.createServer(handleConnection);
    
    // ouve um porta, em um certo endereço
    server.listen(8080,"127.0.0.1", function (){
        console.log("Servidor OK!");
        });
}
main();