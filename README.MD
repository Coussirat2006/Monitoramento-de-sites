# Sistema de Monitorização de Alta Disponibilidade (Uptime Monitor)

Um sistema automatizado e resiliente desenvolvido em **Node.js** para monitorizar a saúde e o tempo de resposta de aplicações web em tempo real.

Este é um projeto prático concebido para consolidar conhecimentos sólidos em Backend, com foco em assincronismo, consumo de APIs e persistência de dados. Para quem, como eu, mira em setores que não podem parar, como o bancário e o de tecnologia crítica, entender este ecossistema é um diferencial enorme.

## 🚀 Funcionalidades

- **Monitorização Automatizada:** Verificação contínua de uma lista de URLs em intervalos regulares.
- **Análise de Desempenho:** Cálculo e exibição do tempo de resposta (em milissegundos) de cada requisição HTTP.
- **Tratamento de Exceções:** Identificação proativa de falhas de conexão ou status HTTP de erro.
- **Registo de Auditoria (Logs):** Persistência dos resultados das verificações num ficheiro local (`log.txt`) para futura análise de métricas e de incidentes.

## 🛠️ Tecnologias Utilizadas

- **JavaScript (ES6+)**
- **Node.js**
- **File System (`fs`)**
- **Fetch API & Async/Await**

## 🧠 Aprendizagem e Impacto

Durante o desenvolvimento desta ferramenta, foi possível ir além da teoria e compreender, na prática, a comunicação entre servidores. A implementação reforçou a importância de não bloquear a *thread* principal do Node.js através de funções assíncronas e consolidou a criação de um histórico de sistema (logs), que constitui a base para a observabilidade em arquiteturas de grande escala.