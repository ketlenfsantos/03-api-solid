//importa a aplicação
import { app } from "./app"
import { env } from "./env"



//executa método listen para abertura de porta
app

.listen({
    host:'0.0.0.0', //um hack q permite front ends acessarem posteriormente nossa aplicação
    port: env.PORT,

}).then(() => {
    console.log('HTTP Server Running ')
})  //then aguarda recebimento e retorna o console.log