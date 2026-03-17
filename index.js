const fs = require('fs'); // 1. Pegamos a ferramenta de escrever arquivos
const express = require('express');
const app = express();
const porta = 3000;
app.use(express.static('public'));
const sites = [
    { nome: "Google", categoria: "Redes", url: "https://www.google.com" },
    { nome: "GitHub", url: "https://github.com" },
    { nome: "Insta", url: "https://www.instagram.com" },
    { nome: "Site Errado", url: "https://www.site-que-nao-existe-12345.com" }
];

// 2. RECEITA: Como salvar uma mensagem no arquivo?
function salvarNoLog(mensagem) {
    const agora = new Date().toLocaleString();
    const textoFinal = `[${agora}] ${mensagem}\n`;
    fs.appendFileSync('log.txt', textoFinal); // Escreve no arquivo
}

// 3. O MONITOR: A função que faz as checagens
async function monitorar() {
    console.log("--- Iniciando Monitoramento ---");

    for (const site of sites) {
        try {
            const resposta = await fetch(site.url);

            if (resposta.ok) {
                site.status = "ONLINE";
                const msg = `✅ ${site.nome}: ONLINE (${resposta.status})`;
                console.log(msg); // Mostra na tela
                salvarNoLog(msg); // <--- AQUI NÓS CHAMAMOS A RECEITA PARA SALVAR NO ARQUIVO!
            } else {
                site.status = "PROBLEMA";
                const msg = `⚠️ ${site.nome}: PROBLEMA (Status: ${resposta.status})`;
                console.log(msg);
                salvarNoLog(msg); // <--- SALVA NO ARQUIVO TAMBÉM
            }
        } catch (erro) {
            site.status = "OFFLINE";
            const msg = `❌ ${site.nome}: OFFLINE (Erro na conexão)`;
            console.log(msg);
            salvarNoLog(msg); // <--- SALVA NO ARQUIVO TAMBÉM
        }
    }
    console.log("-------------------------------\n");
}

// Rota da API (O "Guichê" de atendimento)
app.get('/api/status', (req, res) => {
    res.json(sites); // Quando o navegador acessar, enviamos a lista de sites
});

const TEMPO_ESPERA = 5000; 

// Ligando a máquina do servidor
app.listen(porta, () => {
    console.log(`\n🚀 Servidor API ligado com sucesso!`);
    console.log(`Acesse no navegador: http://localhost:${porta}/api/status\n`);
    
    monitorar(); // Dá o primeiro "ping" nos sites
    setInterval(monitorar, TEMPO_ESPERA); // Continua a cada 5 segundos
});