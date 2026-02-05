# Crypto-Price_-

**preços em tempo real** de criptomoedas populares (Bitcoin, Ethereum, Tether, Litecoin, Cardano e Dogecoin) usando a **CoinGecko API**.

### Tecnologias utilizadas

- HTML5 + CSS3 (flexbox, gradientes, dark mode, responsividade, hover effects)
- JavaScript ES6+ (fetch assíncrono, manipulação de DOM, tratamento de erros)
- CoinGecko API (endpoint `/simple/price` para preços e variação 24h)
- Proxy CORS gratuito (`allorigins.win`) para rodar localmente sem bloqueio
- Fonte Inter (Google Fonts) para tipografia moderna
- VS Code + Live Server para desenvolvimento

- como funciona

1. O JavaScript faz requisições periódicas para a CoinGecko API.
2. Como o projeto roda localmente (localhost), usamos um proxy para contornar o bloqueio CORS do navegador.
3. A API retorna preços em USD e variação percentual das últimas 24 horas.
4. Cada moeda ganha um card com:
   - Ícone circular (de cryptologos.cc)
   - Nome e símbolo
   - Preço formatado (com duas casas decimais)
   - Variação 24h com cor verde (alta) ou vermelha (baixa)
5. Atualização automática a cada 5 minutos + botão manual "Atualizar Agora" com feedback visual (spinner + texto "Atualizando...")
6. 
### Por que usamos um proxy CORS?

Durante o desenvolvimento local (no VS Code com Live Server, endereço `http://localhost:5500`), o navegador bloqueia requisições diretas para a CoinGecko API por causa da política de **CORS** (Cross-Origin Resource Sharing).

A CoinGecko não envia o header `Access-Control-Allow-Origin` permitindo origens localhost, o que é uma prática comum em APIs públicas para evitar abuso.
