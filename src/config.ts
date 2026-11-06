// Tudo que precisa ser trocado pelos dados reais fica aqui.

export const MARCA = "Radar dos Achados";

// Endereço oficial do site. Ao conectar o domínio, defina NEXT_PUBLIC_SITE_URL na Vercel
// (ex.: https://www.radardosachados.com.br) e faça um novo deploy: canonical, sitemap e prévias de
// compartilhamento passam a usar o domínio. Sem ela, usa o endereço de produção da Vercel (next.config.mjs).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
// Razão social, CNPJ, endereço e e-mail ficam em src/lib/empresa.ts.

// Links de convite dos grupos de WhatsApp. Todos entram pelo primeiro link da lista.
// Quando o grupo lotar, tire o link dele e o próximo assume. Ao criar um grupo novo, adicione no fim.
// TODO: colar os links dos grupos do Radar dos Achados. Lista vazia: os botões levam para a seção de exemplos (#sinais).
export const LINKS_WHATSAPP: string[] = [];

// TODO: link do canal do Telegram. Vazio: o botão do Telegram some da página.
export const TELEGRAM = "";

// Categorias de achadinhos (usadas nos cards de exemplo e no texto da página).
export const NICHOS = {
  casa: "Casa e cozinha",
  eletronicos: "Eletrônicos",
  beleza: "Beleza e cuidados",
  utilidades: "Utilidades",
} as const;

export type Nicho = keyof typeof NICHOS;

// Lojas no radar (só o nome, em texto: sem logotipos).
export const LOJAS = ["Shopee", "Mercado Livre", "Magalu", "Amazon"];

// "Shopee, Mercado Livre, Magalu e Amazon"
export const LOJAS_TEXTO = LOJAS.join(", ").replace(/, ([^,]*)$/, " e $1");

// Preço "de/por" nos cards de exemplo (src/data/ofertas.json). Desligado: preço de afiliado muda rápido
// e um valor desatualizado na página é tratado como enganoso pelo Google Ads.
// Para ligar, preencha precoDe/precoPor com valores reais e troque para true. Cards com "R$ 0,00" nunca mostram preço.
export const MOSTRAR_PRECOS = false;

// Medição (opcional). Preencha na Vercel para ativar (veja .env.example). A tag do Google só carrega com
// ADS_ID e começa com consentimento negado (Consent Mode v2) até o aceite no aviso de cookies.
export const ADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "";
export const ADS_ROTULO = process.env.NEXT_PUBLIC_GADS_LABEL || ""; // conversão "Entrar no grupo"
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""; // ex.: G-XXXXXXX (só é configurado junto com a tag do Ads)
// Onde fica salva a escolha do aviso de cookies ("sim" ou "nao").
export const CHAVE_COOKIES = "rda-cookies";

// Aviso fixo logo abaixo do topo, em todas as páginas.
export const AVISO_TOPO =
  "O Radar dos Achados é uma curadoria independente e gratuita de achadinhos. Não somos as lojas nem temos vínculo oficial com as marcas citadas. Podemos receber comissão por compras feitas pelos nossos links, sem custo extra para você.";

// Divulgação de afiliados do rodapé.
export const TEXTO_AFILIADO_RODAPE =
  "Como Associado da Amazon, ganhamos com compras qualificadas. Também participamos de outros programas de afiliados.";

// Aviso de afiliados exibido na seção "Como nos mantemos".
export const TEXTO_AFILIADO =
  "O Radar dos Achados é um serviço independente de curadoria de achadinhos. Quando você compra por um link nosso, a loja pode nos pagar uma comissão, sem custo adicional para você.";

// Mensagem usada no botão "Indicar para um amigo".
export const TEXTO_INDICACAO =
  "Achei um grupo gratuito que avisa quando aparece achadinho bom na Shopee, Mercado Livre, Magalu e Amazon: casa, cozinha, beleza e eletrônicos. Só o admin manda mensagem e dá pra deixar silenciado 👉 ";
