# Nadoti — catálogo de apps

Site estático (HTML + CSS + JS, sem build). Pronto para a Vercel.

## Editar produtos
Tudo fica em `js/products.js`: nome, descrição, preço, imagem, status (`live` / `soon`).
O número de WhatsApp, e-mail e redes ficam em `NADOTI_CONFIG`, no topo do mesmo arquivo.
Imagens vão em `img/`.

## Download grátis com e-mail (Brevo)
Apps com `gated: true` em `js/products.js` mostram um formulário de e-mail no lugar do botão de download.
O formulário chama `api/subscribe.js` (função da Vercel), que coloca o contato numa lista do Brevo
e devolve o link de download. O link fica em `DOWNLOADS`, dentro de `api/subscribe.js`.

Variáveis de ambiente na Vercel (Settings → Environment Variables):
- `BREVO_API_KEY`: chave de API do Brevo.
- `BREVO_LIST_ID`: número da lista onde os contatos entram.

Para liberar outro app assim: adicione o id e o link em `DOWNLOADS` e marque `gated: true` no produto.

## Rodar local
Abra `index.html` no navegador, ou: `npx serve .`

## Publicar na Vercel
1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório.
3. Framework Preset: **Other**. Sem build command. Output: raiz (`.`).
Ou pelo terminal: `npx vercel` (e `npx vercel --prod` para produção).
