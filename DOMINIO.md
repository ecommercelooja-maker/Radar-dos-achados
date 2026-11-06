# Radar dos Achados — como conectar o domínio

Projeto na Vercel: **radar-dos-achados** (time *ecommercelooja*)
Endereço da Vercel: o que aparece em Vercel → projeto → *Domains* (ex.: radar-dos-achados.vercel.app)
Repositório: https://github.com/ecommercelooja-maker/Radar-dos-achados

O site já está pronto para o domínio: canonical, `sitemap.xml`, `robots.txt` e a imagem de prévia
(WhatsApp, Facebook) usam o endereço definido em `NEXT_PUBLIC_SITE_URL` (passo 3).

## 1. Adicionar o domínio na Vercel

Vercel → projeto **radar-dos-achados** → *Settings* → *Domains* → *Add* e adicione os dois:

- `seudominio.com.br`
- `www.seudominio.com.br`

Escolha o principal (recomendado: `www`) e deixe o outro redirecionando para ele (a Vercel oferece isso na tela).

## 2. Configurar o DNS (no painel onde o domínio foi comprado: Registro.br, Hostinger, GoDaddy…)

| Tipo  | Nome / Host | Valor                  |
|-------|-------------|------------------------|
| A     | `@`         | `76.76.21.21`          |
| CNAME | `www`       | `cname.vercel-dns.com` |

- Apague outros registros **A** ou **CNAME** que já existam para `@` e `www` (ex.: "parking" da registradora).
- Não mexa em registros **MX** / **TXT** de e-mail.
- Se a Vercel mostrar valores diferentes na tela de *Domains*, use os da tela.
- A propagação costuma levar de alguns minutos a poucas horas. O HTTPS (cadeado) é emitido pela Vercel automaticamente.

## 3. Avisar o site do endereço novo

Vercel → *Settings* → *Environment Variables*, para **Production**:

```
NEXT_PUBLIC_SITE_URL = https://www.seudominio.com.br
```

Depois faça um novo deploy (*Deployments* → três pontinhos do último → *Redeploy*).

## 4. Publicar alterações

Todo push na `main` publica em produção automaticamente; as outras branches geram um link de prévia.

## 5. Conferir

- `https://www.seudominio.com.br` abre a página com cadeado
- `https://seudominio.com.br` redireciona para o `www`
- `https://www.seudominio.com.br/sitemap.xml` lista o domínio novo

## Antes de anunciar no Google Ads

- `src/lib/empresa.ts`: empresa já preenchida (SULMASTER INTERMEDIACAO DE NEGOCIOS LTDA · SHOP DIG · CNPJ 37.974.261/0001-12). E-mail de contato: suporte@oradardosachados.com. Falta só, se quiser, o endereço do cartão CNPJ (aparece no rodapé e nas páginas legais).
- `src/config.ts`: links dos grupos de WhatsApp (`LINKS_WHATSAPP`) e do Telegram (`TELEGRAM`).
- Vercel → *Environment Variables* (Production): `NEXT_PUBLIC_GADS_ID` e `NEXT_PUBLIC_GADS_LABEL`
  (veja `.env.example`). A tag do Google só carrega com o ID e começa com consentimento negado
  (Consent Mode v2) até o "Aceitar" no aviso de cookies.
