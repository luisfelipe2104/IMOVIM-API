<main>
  <h1 align="center">IMOVIM-API 💻👨‍💻</h1>
  <p align="center">Trata-se de uma API feita exclusivamente para o aplicativo IMOVIM, rede social desenvolvida para o trabalho de conclusão de curso da Etec de Embu, curso de Desenvolvimento de Sistemas</p>
</main>

<section>
  <h2>O que é uma API? 🧐🤨</h2>
  <p>
    API é uma sigla para Application Programming Interface (Interface de programação de aplicação), 
    pode-se fazer uma analogia à um garçom, que serve aos clientes o que foi pedido, no conceito de API
    os clientes são os usuários da aplicação, que indiretamente se comunicam com a API, pedindo ou relatando
    situações, e recebendo os dados que foram pedidos.
  </p>
  
  
  <h2>Rotas 🚗🚙✈</h2>
  <p>
    Essa aplicação possui rotas, que são os tópicos da comunicação, por exemplo, a rota /login, serve para tratar os dados
    do login do usuário, a rota /cadastro serve para tratar sobre o cadastro.
  </p>
</section>

<br>
<br>
  
<section>
  <h2 align="center">Rotas programadas👩‍💻</h2>
  
  <section>
    <h3>/user</h3>
    
    <p>Essa rota da acesso a outras rotas:</p>
    
    <ul>
      <li>/login</li>
      <li>/create-user</li>
    </ul>
  </section>
  
  
  <h3>POST: /user/login</h3>
  <p>
    para acessar os dados dessa rota, deve-se dar um POST com o body possuindo o seguinte json:
  </p>
  
  ```json
  {
    "email": "email",
    "password": "senha"
  }
  ```
  
  <h3>POST: /user/create-user</h3>
  <p>
    para acessar os dados dessa rota, deve-se dar um POST com o body possuindo o seguinte json:
  </p>
  
  ```json
  {
    "nickname":"nomeDeUsuario",
    "email":"email",
    "password":"senha",
    "birthday":"dataDeAniversario"
  }
  ```
</section>
