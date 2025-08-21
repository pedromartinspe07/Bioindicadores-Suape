# Bioindicadores da Qualidade da Água em Áreas de Influência do Porto de Suape

## Visão Geral do Projeto

Este repositório contém o código-fonte de um website científico dedicado à pesquisa sobre o uso de bioindicadores para avaliar a saúde dos ecossistemas costeiros na região de influência do Complexo Industrial Portuário de Suape, Pernambuco. O projeto visa disponibilizar dados, metodologias e resultados de forma transparente e acessível à comunidade científica, órgãos ambientais e ao público em geral.

## Tema Principal

**Bioindicadores da Qualidade da Água em Áreas de Influência do Porto de Suape: Avaliação da Saúde de Ecossistemas Costeiros.**

## Funcionalidades do Site

O website foi aprimorado para oferecer uma experiência profissional e informativa, incluindo:

*   **Navegação Abrangente**: Novas páginas (`Sobre`, `Publicações`, `Dados`, `Glossário`, `Contato`) para uma exploração aprofundada do projeto.
*   **Design Científico e Profissional**: Layout limpo, paleta de cores sóbrias e tipografia focada na legibilidade, ideal para um ambiente acadêmico.
*   **Busca Aprimorada**: Uma barra de pesquisa funcional que permite buscar conteúdo em *todas* as páginas do site, facilitando a localização de informações específicas.
*   **Visualização de Dados Interativa**: Implementação de gráficos (com Chart.js) na página de resultados para apresentar dados de forma clara e interativa.
*   **Seções de Download**: Acesso facilitado a relatórios técnicos e conjuntos de dados brutos/tratados.
*   **Formulário de Contato**: Uma página dedicada para facilitar a comunicação com a equipe do projeto.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
Bioindicadores-Suape/
├── css/
│   └── style.css           # Estilos globais e específicos do projeto
├── dados/
│   └── dados_brutos.csv    # Exemplo de dados brutos
│   └── relatorio_tecnico.pdf # Exemplo de relatório técnico
├── images/
│   └── ...                 # Imagens utilizadas no site (logo, banner, ícones)
├── js/
│   ├── script.js           # Funções gerais do site (debounce, smooth scroll, copyright)
│   └── search.js           # Lógica da barra de pesquisa (busca em todas as páginas)
├── index.html              # Página inicial
├── projeto.html            # Detalhes sobre o projeto e metodologia
├── referencial.html        # Referencial teórico e bibliográfico
├── resultados.html         # Apresentação de resultados com visualizações de dados
├── sobre.html              # Informações detalhadas sobre o projeto e equipe
├── publicacoes.html        # Lista de publicações científicas
├── dados.html              # Seção para acesso a dados brutos e tratados
├── glossario.html          # Glossário de termos técnicos
├── contato.html            # Página de contato com formulário
└── README.md               # Este arquivo
└── LICENSE                 # Licença do projeto
```

## Tecnologias Utilizadas

*   **HTML5**: Estrutura e conteúdo das páginas.
*   **CSS3**: Estilização e design responsivo.
*   **JavaScript (ES6+)**: Interatividade e funcionalidades dinâmicas.
*   **Chart.js**: Biblioteca para criação de gráficos interativos.

## Como Executar Localmente

Para visualizar o site localmente, siga estes passos:

1.  **Clone o Repositório**:
    ```bash
    git clone https://github.com/seu-usuario/Bioindicadores-Suape.git
    ```
2.  **Navegue até o Diretório do Projeto**:
    ```bash
    cd Bioindicadores-Suape
    ```
3.  **Abra o `index.html`**: Simplesmente abra o arquivo `index.html` em seu navegador de preferência. Não é necessário um servidor web para as funcionalidades atuais.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
