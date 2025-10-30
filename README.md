    # Desafio POSTECH – Fullstack

Aplicação simples em HTML, CSS e JavaScript puro para enviar as informações do grupo via POST no formato JSON.

## Como usar

1. Abra o arquivo `index.html` no navegador (basta dar dois cliques ou abrir com o servidor estático de sua preferência).
2. Preencha pelo menos um dos campos de nome e o campo "História do grupo".
3. Clique em "Enviar". Em caso de sucesso, os campos serão limpos e um alerta será exibido. Em caso de erro, um alerta informará a falha.

## Regras atendidas

- Somente HTML + CSS + JavaScript puro, com CSS e JS separados do HTML.
- Envio por `POST` para o endpoint (com fallback):
  - `https://fsdt-contact.onrender.com/contact`
  - `https://fsdt-contact-acf4ab9867a7.herokuapp.com/contact`
- Payload JSON:

```json
{
  "names": ["Nome 1", "Nome 2"],
  "message": "História do grupo"
}
```

- Após sucesso: limpa o formulário sem recarregar a página e mostra `alert` de sucesso.
- Em caso de erro: mostra `alert` de erro.

## Estrutura

```
index.html   # Estrutura do formulário e layout
styles.css   # Estilos (responsivo) do layout e do formulário — nome seguindo kebab-case
script.js    # Lógica de coleta, validação e envio com fallback
```

## Observações

- A validação mínima exige ao menos 1 nome e a mensagem preenchida.
- O botão "Enviar" é desabilitado enquanto a requisição está em andamento.
- Caso o primeiro endpoint esteja indisponível, a aplicação tenta automaticamente o segundo.
