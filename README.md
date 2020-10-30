# desafio-backend-takeat-2020

<p align="center"> 
  <img alt="GoStack"  src="logo.png" />
</p>

<h3 align="center">
  Desafio: Desenvolvimento de API comNode.js
</h3>

<p align="center">
  <a href="#sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#entrega">Entrega</a>
</p>

## Sobre o desafio

Nesse desafio, você deverá criar uma aplicação em Node.js, para que seja possível avaliar seus conhecimentos técnicos em backend. As especificações são simples, de forma que você tem liberade caso queira adicionar algo ou sugerir alguma forma diferente de resolver, ficando apenas obrigatório o uso do Node.js, do banco de dados PostgreSQL e da ORM Sequelize.

A organização do código, a estrutura das pastas fica à seu critério, assim como a utilização de ferramentas para otimizar essa organização, como o ESLint.

## Especificação da aplicação

Você irá desenvolver uma aplicação que permita criar um restaurante e um cardápio digital simplificado, contendo diversos produtos daquele restaurante. Para essas duas entidades, você deverá criar duas tabelas em seu banco de dados com as seguintes características:

### Restaurante

- `id:` Primary key incremental
  - ID que representa aquele restaurante no banco de dados
- `email`: String
  - Email do restaurante
- `name:` String
  - Nome do restaurante
- `adress:` String
  - String que guarda o endereço do restaurante
- `phone`: String
  - Número de telefone caso o cliente queira entrar em contato com o restaurante
- `created_at`: Date
- `updated_at`: Date

### Produto

- `id:` Primary key incremental
  - ID que representa aquele produto no banco de dados
- `restaurant_id:` integer
  - ID do restaurante ao qual aquele produto pertence. Deve fazer relação à tabela de restaurantes
- `name:` String
  - Nome do produto
- `description`: String
  - Descrição do produto
- `price`: Double
  - Preço do produto
- `complements`: String
  - String que descreve os complementos daquele produto
- `created_at`: Date
- `updated_at`: Date

Você precisa criar as migrations para as duas tabelas no banco de dados, utilizando o sequelize. Lembrando que a tabela de produtos tem uma referência para a tabela restaurante.
Caso tenha dúvidas, você pode consultar a [Documentação de migrations do Sequelize](https://sequelize.org/master/manual/migrations.html)

Além disso, você deverá criar seu banco de dados utilizando um container com o Docker. Você pode consultar esta [página do PostgreSQL no dockerHub](https://hub.docker.com/_/postgres)

Utilize o Postman, insomnia ou software similar para criar e testar suas requisições

Para visualizar os dados em seu banco de dados, você pode utilizar o [Postbird](https://www.electronjs.org/apps/postbird) ou o [Dbeaver](https://dbeaver.io/) ou algum software similar

### Rotas da aplicação

- **`POST /restaurants`**: A rota deve receber `name`, `email`, `adress`, `phone` dentro do corpo da requisição. Ao cadastrar um novo restaurante, ele deve ser armazenado dentro do seu banco de dados e deve ser retornado o restaurante criado.

**Dica**: Antes de criar um novo restaurante, sempre verifique se já existe um restaurante com o mesmo nome e e-mail. Caso ele exista, retorne um erro.

- **`GET /restaurants`**: A rota deve retornar todos os restaurantes cadastrados no banco de dados da aplicação e todos os seus dados

- **`PUT /restaurants/:restaurant_id`**: A rota deve receber como parâmetro o id do restaurante (`restaurant_id`) e no corpo da requisição os dados que serão atualizados, que podem ser `name`, `email`, `adress`, `phone`.

- **`DELETE /restaurants/:restaurant_id`**: A rota deve receber como parâmetro o id do restaurante (`restaurant_id`) e retornar o status 204 caso o restaurante seja deletado com sucesso, ou um erro caso falhe.

- **`POST /products`**: A rota deve receber `name`, `price`, `description`, `complements` e`restaurant_id` dentro do corpo da requisição. Com esses dados devem ser criados no banco de dados um novo produto, e a rota deve retornar este produto criado.

- **`PUT /products/:product_id`**: A rota deve receber como parâmetro o id do produto, e no corpo da requisição os dados que serão atualizados daquele produto

**Dica**: Verifique sempre se o restaurante existe quando for atualizar esse dado

- **`DELETE /products/:product_id`**: A rota deve receber como parâmetro o id do produto (`product_id`), e deletar o mesmo. A rota deve retornar o status 204 com corpo vazio caso dê sucesso, ou um erro caso falhe ao deletrar o produto

- **`GET /menu/:restaurant_id`**: A rota deve receber como parâmetro o id do restaurante, e retornar todos os produtos cadastrados daquele restaurante

**Dica 3**: A sua requisição para criar um restaurante deve enviar um JSON com o formato parecido com esse:

```json
{
  "name": "Restaurante",
  "email": "restaurante@restaurante.com",
  "adress": "Rua tal, Nº 120. nesse Bairro, naquela cidade",
  "phone": "(27) 00000-0000"
}
```

**Dica 4**: Essa rota deverá retornar um json como esse:

```json
{
  "id": "1",
  "name": "Restaurante",
  "email": "restaurante@restaurante.com",
  "adress": "Rua tal, Nº 120. nesse Bairro, naquela cidade",
  "phone": "(27) 00000-0000",
  "created_at": "2020-10-11T07:09:48.767Z",
  "updated_at": "2020-10-11T07:09:48.767Z"
}
```

### Links úteis

- [Models no sequelize](https://sequelize.org/master/manual/model-basics.html)
- [Opções de relacionamentos do Sequelize](https://sequelize.org/master/manual/assocs.html)

## Entrega

Você deverá fazer um `fork` deste repositório, e resolver o desafio. O desafio deve ser entregue enviando um email para tecnologia@takeat.app, envie o link do repositório que você fez suas alterações. além do **código da aplicação**, você deverá exportar no postman ou insomnia o **arquivo contendo as requisições** que você criou, em formato JSON de preferência, e colocá-lo junto dos arquivos no repositório da aplicação

---

Feito com ❤️ by Takeat. [Saiba mais sobre a gente](https://takeat.app)
