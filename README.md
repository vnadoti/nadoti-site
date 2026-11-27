# Nadoti — catálogo de apps

Site estático (HTML + CSS + JS, sem build). Pronto para a Vercel.

## Editar produtos
Tudo fica em `js/products.js`: nome, descrição, preço, imagem, status (`live` / `soon`).
O número de WhatsApp, e-mail e redes ficam em `NADOTI_CONFIG`, no topo do mesmo arquivo.
Imagens vão em `img/`.

## Rodar local
Abra `index.html` no navegador, ou: `npx serve .`

## Publicar na Vercel
1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório.
3. Framework Preset: **Other**. Sem build command. Output: raiz (`.`).
Ou pelo terminal: `npx vercel` (e `npx vercel --prod` para produção).
