/*
  script.js
  - Lida com a coleta dos campos do formulário
  - Validação mínima (1 nome e mensagem obrigatórios)
  - Envia o payload JSON via POST para um endpoint (com fallback)
  - Em caso de sucesso limpa o formulário sem recarregar e mostra alerta
  - Em caso de erro mostra alerta de erro
*/

(function(){
  // Elementos do DOM
  const form = document.getElementById('group-form');
  const submitBtn = document.getElementById('submit-btn');

  // Endpoints: tenta o primeiro e, se falhar, tenta o segundo (fallback)
  const ENDPOINTS = [
    'https://fsdt-contact.onrender.com/contact',
    'https://fsdt-contact-acf4ab9867a7.herokuapp.com/contact'
  ];

  /**
   * Tenta enviar o payload para múltiplos endpoints em sequência.
   * Retorna a resposta do primeiro endpoint que responder com ok.
   * Lança erro se todos falharem.
   */
  async function postWithFallback(urls, payload){
    let lastErr;
    for(const url of urls){
      try{
        // Envia JSON usando fetch
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if(res.ok){
          return res; // sucesso neste endpoint
        }
        // se o status não for ok, guarda o erro e tenta o próximo
        lastErr = new Error(`HTTP ${res.status}`);
      }catch(err){
        // erro de rede ou CORS etc. guarda e tenta próximo
        lastErr = err;
      }
    }
    // todos os endpoints falharam: relança o último erro
    throw lastErr || new Error('Falha ao enviar');
  }

  // Intercepta o envio do formulário
  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault(); // evita reload automático do navegador

    // Pega todos os inputs de nome e o textarea da mensagem
    const nameInputs = Array.from(document.querySelectorAll('.name-input'));
    const message = document.getElementById('message').value.trim();

    // Cria um array apenas com os nomes preenchidos
    const names = nameInputs
      .map(i => i.value.trim())
      .filter(Boolean);

    // Validação mínima: ao menos 1 nome e mensagem
    if(names.length === 0 || !message){
      alert('Preencha ao menos um nome e a história do grupo.');
      // foca no primeiro campo não preenchido para ajudar o usuário
      (names.length === 0 ? nameInputs[0] : document.getElementById('message')).focus();
      return;
    }

    // Desabilita o botão para evitar envios duplicados
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';

    const payload = { names, message };

    try{
      // Envia com fallback de endpoints
      await postWithFallback(ENDPOINTS, payload);
      // Sucesso: limpa o formulário sem recarregar a página
      form.reset();
      // Notifica o usuário
      alert('Dados enviados com sucesso!');
    }catch(err){
      // Log para debugging e alerta para o usuário
      console.error('Erro ao enviar:', err);
      alert('Ocorreu um erro ao enviar: ' + err.message + '. Tente novamente.');
    }finally{
      // Restaura o estado do botão
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
