# Documentação - Escola Avanço

## 1. **Introdução**
NNo cenário educacional atual, a falta de ferramentas adequadas dificulta a publicação e o compartilhamento de conteúdos educacionais de forma centralizada e acessível. A aplicação Escola Avanço foi desenvolvida para enfrentar esse desafio, permitindo que professores da rede pública publiquem aulas de maneira intuitiva e tecnológica, enquanto os alunos têm acesso fácil e organizado a esses materiais.

A aplicação utiliza uma arquitetura em MVC, implementada com Node.js, MongoDB, e comunicação via REST APIs. Além disso, conta com containerização via Docker e automação de CI/CD com GitHub Actions, garantindo um ambiente escalável e consistente.

---

## 2. **Funcionalidades**
- **Usuários**
  - Cadastro, autenticação (via JWT) e listagem de usuários.

- **Aulas**
  - Criação, listagem, leitura, atualização e exclusão de aulas.
 
---

## 3. **Tecnologias Utilizadas**
- **Back-end:** Node.js, Express.js
- **Banco de Dados:** MongoDB com Mongoose
- **Autenticação:** JWT (JSON Web Tokens)
- **Testes:** Jest
- **Transpiler:** Babel
- **Containerização:** Docker
- **Automação de CI/CD:** GitHub Actions

---

## 4. **Estrutura do Projeto**

### **Arquivos na Raiz**
- **`.gitignore`**: Define arquivos e pastas que o Git deve ignorar no versionamento.
- **`DockerFile`**: Configuração do Docker para criar a imagem do projeto.
- **`README.md`**: Arquivo de documentação que descreve o propósito do projeto, além de como configurá-lo e usá-lo.
- **`babel.config.js`**: Configuração do Babel, usado para transpilar o código.
- **`docker-compose.yml`**: Arquivo para configurar serviços do Docker em containers.
- **`env`**: Armazena variáveis de ambiente.
- **`package-lock.json`**: Arquivo gerado automaticamente pelo npm para bloquear as versões das dependências.
- **`package.json`**: Lista as dependências do projeto e scripts npm, além de informações sobre o projeto.
- **`server.js`**: Arquivo principal que inicializa o servidor.

### **Diretório `src` (código principal):**
- **`app.js`**: Configuração da aplicação Express (roteamento e middleware).
- **`config/dbConnect.js`**: Configuração para conectar ao banco de dados.
- **`controllers/aulaController.js`**: Lógica de controle relacionada às aulas.
- **`controllers/aulaController.test.js`**: Testes para o `aulaController`.
- **`controllers/usuarioController.js`**: Lógica de controle relacionada aos usuários.
- **`middleWare/authMiddleware.js`**: Middleware para autenticação.
- **`models/Aula.js`**: Modelo do banco de dados para aulas.
- **`models/PapelUsuario.js`**: Modelo para papéis de usuário.
- **`models/Usuario.js`**: Modelo do banco de dados para usuários.
- **`routes/aulasRoutes.js`**: Rotas relacionadas às aulas.
- **`routes/index.js`**: Ponto de entrada para todas as rotas.
- **`routes/usuariosRoutes.js`**: Rotas relacionadas aos usuários.

---

## 6. **Rotas Principais**

### **Usuários**
| Método | Rota        | Descrição                | Permissões  |
|--------|-------------|--------------------------|-------------|
| POST   | `/usuarios` | Criar novo usuário       | Professores |
| POST   | `/login`    | Autenticar usuário       | Aberto      |
| GET    | `/usuarios` | Listar todos os usuários | Professores |

### **Aulas**
| Método | Rota                 | Descrição                           | Permissões           |
|--------|----------------------|-------------------------------------|----------------------|
| POST   | `/aulas`             | Criar nova aula                     | Professores          |
| GET    | `aulas`              | Listar todas as aulas               | Professores          |
| GET    | `aulas/principal`    | Listar as aulas da página principal | Professores e alunos |
| GET    | `aulas/:id`          | Ler uma aula                        | Professores e alunos |
| PUT    | `aulas/:id`          | Atualizar uma aula                  | Professores          |
| DELETE | `aulas/:id`          | Deletar uma aula                    | Professores          |
| GET    | `aulas/busca?termo=` | Buscar aula por palavra-chave       | Professores e alunos |

---

## 7. **Como Executar o Projeto**

### **Pré-requisitos**
- Node.js (versão mínima: 14.x)
- MongoDB (local ou remoto)
- Docker (para containerização)

### **Passos para Execução**
1. Clone o repositório e acesse o diretório:
   ```bash
   git clone https://github.com/svcguilherme/tech-challenge02
   cd tech-challenge02
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/techChallenge
   JWT_SECRET=<chave>
   ```

4. Execute a aplicação:
   ```bash
   npm run dev
   ```

5. Rode os testes:
   ```bash
   npm run test
   ```

---

## 8. **Principais Desafios**

### 1. **Incompatibilidade de Versão do Node.js**  
   - O projeto apresentou comportamentos inconsistentes ao ser executado com as versões 18 e 20 do Node.js, exigindo ajustes específicos para garantir compatibilidade e estabilidade.

### 2. **Configuração de Módulos (CommonJS vs. ES Modules)**  
   - A incompatibilidade entre o Jest e a sintaxe ES Modules (`export default`) gerou a necessidade de migrar para o formato CommonJS (`module.exports`), impactando múltiplos arquivos de configuração, como o `jest.config`, `babel.config` e `package.json`.

### 3. **Dependência de Transpilação com Babel**  
   - Foram detectados erros relacionados ao Babel, que não processava corretamente as configurações de transpilação. Ajustes foram necessários para compatibilizar o Babel com a nova configuração de módulos.

### 4. **Instabilidade ao Alternar Configurações**  
   - Alterações anteriores no formato de módulos e na versão do Node.js não apresentaram resultados consistentes. Problemas que eram resolvidos momentaneamente voltavam a ocorrer em diferentes contextos de execução.

### 5. **Build e Integração no Docker Compose**  
   - Inicialmente, dificuldades surgiram na construção do projeto com o Docker Compose. Após ajustes, o build foi concluído com sucesso, o que validou as configurações realizadas.  
   - Houve também o desafio de integrar o MongoDB no ambiente Docker para garantir a persistência de dados.

### 6. **Cobertura de Testes Automatizados**  
   - Foi necessário implementar testes para garantir uma cobertura mínima exigida, validando funcionalidades críticas como criação, edição e exclusão de aulas e usuários.

### 7. **Automação do CI/CD com GitHub Actions**  
   - A configuração inicial dos workflows no GitHub Actions representou um desafio, especialmente para garantir que o pipeline de CI/CD fosse executado de forma eficiente e automatizada.

## 9. **Lições Aprendidas**
  - A importância de testes unitários e automatizados para garantir a qualidade do código e a confiabilidade do sistema.
  - Como a arquitetura REST e a containerização contribuem para escalabilidade e consistência.
  - O valor da automação com GitHub Actions para simplificar o fluxo de trabalho e melhorar a produtividade da equipe.

---

## 10. **Conclusão**
A **Escola Avanço** é uma solução tecnológica que visa facilitar a comunicação entre professores e alunos, promovendo a inclusão digital na rede pública de educação. O projeto integra conhecimentos em desenvolvimento de APIs, autenticação, testes e boas práticas de programação, sendo uma aplicação escalável e de fácil manutenção.
