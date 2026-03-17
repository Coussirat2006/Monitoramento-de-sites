const fs = require('fs'); // 1. Pegamos a ferramenta de escrever arquivos

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
                const msg = `✅ ${site.nome}: ONLINE (${resposta.status})`;
                console.log(msg); // Mostra na tela
                salvarNoLog(msg); // <--- AQUI NÓS CHAMAMOS A RECEITA PARA SALVAR NO ARQUIVO!
            } else {
                const msg = `⚠️ ${site.nome}: PROBLEMA (Status: ${resposta.status})`;
                console.log(msg);
                salvarNoLog(msg); // <--- SALVA NO ARQUIVO TAMBÉM
            }
        } catch (erro) {
            const msg = `❌ ${site.nome}: OFFLINE (Erro na conexão)`;
            console.log(msg);
            salvarNoLog(msg); // <--- SALVA NO ARQUIVO TAMBÉM
        }
    }
    console.log("-------------------------------\n");
}

const TEMPO_ESPERA = 5000; 

console.log(`🚀 Monitor iniciado! Verificando a cada ${TEMPO_ESPERA / 1000} segundos.`);

monitorar(); // Roda a primeira vez
setInterval(monitorar, TEMPO_ESPERA); // Roda a cada 5 segundos