const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,ethereum,litecoin,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true';

const container = document.querySelector('.container');
const loading = document.querySelector('.loading');
const refreshBtn = document.getElementById('refreshBtn');

function fetchPrices() {
  loading.style.display = 'block';

  const proxyUrl = 'https://corsproxy.io/?';
  const fullUrl = proxyUrl + encodeURIComponent(API_URL);

  fetch(fullUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Erro: ${res.status}`);
      return res.json();
    })
    .then(data => {
      loading.style.display = 'none';

      if (!data || !data.bitcoin) {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;padding:40px;">Erro ao carregar dados. Tente novamente.</p>';
        return;
      }

      container.innerHTML = '';

      Object.keys(data).forEach(coin => {
        const info = data[coin];
        const price = info.usd || 0;
        const change = (info.usd_24h_change || 0).toFixed(2);
        const isPositive = Number(change) >= 0;
        const changeClass = isPositive ? 'positive' : 'negative';
        const sign = isPositive ? '+' : '';

        const logoMap = {
          bitcoin: 'bitcoin-btc',
          ethereum: 'ethereum-eth',
          tether: 'tether-usdt',
          litecoin: 'litecoin-ltc',
          cardano: 'cardano-ada',
          dogecoin: 'dogecoin-doge'
        };
        const logoSlug = logoMap[coin] || coin;
        const logoUrl = `https://cryptologos.cc/logos/${logoSlug}-logo.png?v=040`;

        container.innerHTML += `
          <div class="coin">
            <div class="coin-logo">
              <img src="${logoUrl}" alt="${coin}" onerror="this.src='https://via.placeholder.com/56?text=${coin[0].toUpperCase()}'">
            </div>
            <div class="coin-info">
              <div class="coin-name">${coin.toUpperCase()}</div>
              <div class="coin-symbol">/USD</div>
            </div>
            <div class="coin-price-info">
              <div class="coin-price">$${Number(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div class="coin-change ${changeClass}">${sign}${change}%</div>
            </div>
          </div>
        `;
      });

      container.innerHTML += `
        <p style="color:#94a3b8;text-align:center;margin-top:24px;font-size:0.9rem;">
          Última atualização: ${new Date().toLocaleTimeString('pt-BR')}
        </p>
      `;
    })
    .catch(err => {
      loading.style.display = 'none';
      container.innerHTML = `<p style="color:#ef4444;text-align:center;padding:40px;">Erro: ${err.message}. Tente novamente.</p>`;
    });
}

// Inicia ao abrir a página
fetchPrices();

// Auto-update a cada 5 minutos
setInterval(fetchPrices, 300000);

// Botão com efeito completo e seguro
refreshBtn.addEventListener('click', async () => {
  // Desabilita e mostra loading no botão
  refreshBtn.disabled = true;
  document.getElementById('btnText').textContent = 'Atualizando...';
  document.getElementById('btnSpinner').classList.remove('hidden');

  try {
    await fetchPrices();  // Chama a função (agora async)
  } catch (err) {
    console.error('Erro no clique:', err);
  } finally {
    // SEMPRE volta ao normal, mesmo com erro
    refreshBtn.disabled = false;
    document.getElementById('btnText').textContent = 'Atualizar Agora';
    document.getElementById('btnSpinner').classList.add('hidden');
  }
});

// Torna fetchPrices async pra usar await
async function fetchPrices() {
  loading.style.display = 'block';

  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const fullUrl = API_URL; 

  try {
    const res = await fetch(fullUrl);
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();

    console.log('Dados da API:', data); // Debug

    if (!data || !data.bitcoin) {
      throw new Error('Dados inválidos');
    }

    container.innerHTML = '';

    Object.keys(data).forEach(coin => {
      const info = data[coin];
      const price = info.usd || 0;
      const change = (info.usd_24h_change || 0).toFixed(2);
      const isPositive = Number(change) >= 0;
      const changeClass = isPositive ? 'positive' : 'negative';
      const sign = isPositive ? '+' : '';

      const logoMap = {
        bitcoin:   'bitcoin-btc',
        ethereum:  'ethereum-eth',
        tether:    'tether-usdt',
        litecoin:  'litecoin-ltc',
        cardano:   'cardano-ada',
        dogecoin:  'dogecoin-doge'
      };
      const logoSlug = logoMap[coin] || coin;
      const logoUrl = `https://cryptologos.cc/logos/${logoSlug}-logo.png?v=040`;

      container.innerHTML += `
        <div class="coin">
          <div class="coin-logo">
            <img src="${logoUrl}" alt="${coin}" onerror="this.src='https://via.placeholder.com/56?text=${coin[0].toUpperCase()}'">
          </div>
          <div class="coin-info">
            <div class="coin-name">${coin.toUpperCase()}</div>
            <div class="coin-symbol">/USD</div>
          </div>
          <div class="coin-price-info">
            <div class="coin-price">$${Number(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div class="coin-change ${changeClass}">${sign}${change}%</div>
          </div>
        </div>
      `;
    });

    container.innerHTML += `
      <p style="color:#94a3b8;text-align:center;margin-top:24px;font-size:0.9rem;">
        Última atualização: ${new Date().toLocaleTimeString('pt-BR')}
      </p>
    `;
  } catch (err) {
    console.error('Erro ao buscar preços:', err);
    container.innerHTML = `<p style="color:#ef4444;text-align:center;padding:40px;">Erro: ${err.message}. Tente novamente.</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

// Inicia ao abrir
fetchPrices();

// Auto-update a cada 5 minutos (sem interferir no botão)
setInterval(fetchPrices, 300000);