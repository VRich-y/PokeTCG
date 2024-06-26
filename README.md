# Projeto Pokémon TCG Website

## Visão Geral

Este website é desenvolvido para exibir cartas do Pokémon TCG utilizando a API Pokémon TCG. Abaixo estão algumas informações importantes sobre o projeto:

**Credenciais de Login para Teste:**
- **Usuário:** richardy.vitorino
- **Senha:** password

## Funcionalidades

### Tela de Login
- A tela inicial solicita o nome de usuário e a senha.
- Após o login bem-sucedido, o usuário é direcionado para a tela inicial do site.

### Estrutura do Site
- **Cabeçalho Fixo:** Sempre visível no topo da página.
- **Menu Lateral Fixo:** Contém botões e informações do usuário.
  - **Botão Vermelho com Foto do Usuário:** Ao clicar, são exibidas opções adicionais: profile e logout.
  - **Botões "Cards" e "Sets":** Navegação para as respectivas páginas de listagem.

### Página de Cards
- **Listagem de Cartas:** Exibe cartas de 30 em 30 usando a técnica de paginação "scroll infinito".
- **Detalhes da Carta:** Ao clicar em uma carta, é direcionado para uma tela com informações detalhadas como nome, HP, tipo, ataque, entre outros.
- **Pesquisa:** Campo para buscar cartas pelo nome.
- **Botão de Voltar:** Após realizar uma busca, um botão para retornar à tela anterior é exibido.

### Página de Sets
- **Listagem de Sets:** Exibe todos os sets de cartas.
- **Pesquisa:** Campo para buscar sets específicos pelo nome.
- **Detalhes do Set:** Ao clicar em um set, é direcionado para uma tela com outras informações como data de lançamento, número de cartas, etc.
    - **Listagem de Cartas na tela de Detalhes do Set:** Exibe cartas de 30 em 30 dentro do set, com um campo de busca para buscar cartas do set pelo nome.

### Página de Perfil
- **Informações do Usuário:** Exibe detalhes sobre o usuário.
- **Botão de Logout:** Opção para sair da conta.

## Funcionalidades de Pesquisa
- **Pesquisa Global:** As barras de pesquisa estão disponíveis em todas as páginas de listagem e filtram apenas a lista ativa.
- **Persistência do Filtro:** O termo de busca permanece ativo ao trocar de listagem, aplicando o filtro na nova lista carregada.


### Design Consistente
- Todas as páginas, exceto a de login, mantêm o cabeçalho e o menu lateral fixo, proporcionando uma navegação consistente e fácil acesso às funcionalidades principais.
