// CRIADA PASTA ERROS PARA TER UM ARQUIVO ESPECÍFICO PRA CADA ERRO//




export class UserAlreadyExistsError extends Error {
    //metodo constructor do error, que é nativo do node
    constructor(){
        super('E-mail Already exists')
    }
}