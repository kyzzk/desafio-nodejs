# Desafio Node.JS

### Objetivos:

- Desenvolver uma API em Node.JS que recebe requisições POST com um CEP como parâmetro.
- CEP deve ser pesquisado em https://viacep.com.br/ e o retorno deve vir na resposta da requisição.
- Esta API deve possuir algum tipo de autenticação.
- Usar uma solução de cache para que se o mesmo CEP for digitado em um intervalo de até cinco minutos, não ir para o ViaCEP e buscar os dados diretamente do cache.
- Sinalizar no retorno da requisição se o dado está vindo do ViaCep ou do cache.


### Dependencias Node.JS:

- express
- axios
- memory-cache


### Exemplo de requisição:

Mande uma requisição POST para o URL: "localhost:3000/CEP". (3000 é a porta padrão do projeto, pode ser alterada)
É preciso informar um Authorization Basic Auth nas Headers para ter acesso a resposta da requisição.

Link para exemplo no Postman: [Click Aqui!](https://www.postman.com/kyzzk/workspace/desafio-nodejs/collection/19365080-4e75e4cf-584c-4718-817c-3b0b9f60b7a6?action=share&creator=19365080)


**Usuários que podem ser usados:**

- Username: normal_user
- Password: 1234

- Username: admin_user
- Password: 1234


"CEP" deve ser substituído pelo CEP de 8 digitos que deseja fazer a pesquisa, exemplo: "/12345678". O CEP pode ser informado de todas as formas possíveis: "12.345-678", "12345-678" ou "12345678".


## Respostas da API

Usuário inexistente ou senha incorreta retornará um status 401 (Unauthorized)
```
{
    "erro": "Suas credenciais estão incorretas."
}
```

CEP existente irá retornar um status 200 (OK)
```
{
  "fonte": "ViaCep"
},
{
  "cep": "82940-110",
  "logradouro": "Rua Miguel Caluf",
  "complemento": "de 1116/1117 ao fim",
  "bairro": "Cajuru",
  "localidade": "Curitiba",
  "uf": "PR",
  "ibge": "4106902",
  "gia": "",
  "ddd": "41",
  "siafi": "7535"
  }
}
```
A fonte é o parâmetro que foi solicitado para informar se a resposta está vindo do Cache ou não.
(A mesma requisição permanece salva por 5 minutos no seu cache)
```
{
  "fonte: "ViaCep"
}
```
Requisição vinda direto do site "ViaCep".
```
{
  "fonte: "Cache"
}
```
Requisição salva no seu "Cache".

CEP inexistente ou incorreto retornará um status 400 (Bad Request).
```
{
    "erro": "Esse CEP não foi encontrado, verifique se está correto e tente novamente."
}
```
