    # App

GymPass style app.

## RFs (Requisitos funcionais são as funcionalidades da aplicação, o que cada usuário pode fazer)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio condições para usuário agir, de acordo com requisitos funcionais: OS IFS do codigo)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais: requisitos mais tecnicos, quais estrategias, banco de dados etc)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);


JWT: JSON WEB TOKEN - mais comum utilizado para autenticar, cria token unico

como funciona: usuário faz login, envia email, o backend cria um token UNICO,
e não modificavel e STATELESS (nao e salvo no banco de dados)

STATELESS: Não armazenado em nehuma estrutura de persistência de dados(banco de dados)
O back end quando vai criar o token ele usa uma palavra chave (string)

Dentro, configuro essa palavra chave : ex - duahsiuhdash

email/senha => duahsiuhdash  header.payload.sign

- 1 parte do token: CABEÇALHO.
Qual algoritimo agt usou pra criar o token: existem varias nomenclaturas
ex: HS256

- 2 parte: PAYLOAD
Qualquer informação que eu quiser
ex: sub:id do usuário  name:  iat: 

- 3 parte: Sign assinatura
Gera uma assinatura do tokenpara nao ser modificado.

Login: gera um JWT(TOKEN)
JWT -> TODAS REQUISIÇÕES 
Leva por meio do HEADER
