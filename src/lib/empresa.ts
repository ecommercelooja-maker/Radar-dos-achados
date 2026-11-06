// Dados da empresa responsável pelo site. Único lugar para alterar: rodapé e páginas legais leem daqui.
// TODO: endereço do cartão CNPJ antes de anunciar no Google Ads.

export const RAZAO_SOCIAL = "SULMASTER INTERMEDIACAO DE NEGOCIOS LTDA";
export const NOME_FANTASIA = "SHOP DIG";
export const CNPJ = "37.974.261/0001-12";
// Endereço de registro (cartão CNPJ). Vazio: o endereço some do rodapé e das páginas legais.
export const ENDERECO = "";
// ", endereço" pronto para colar depois do CNPJ (vazio quando não há endereço).
export const ENDERECO_SUFIXO = ENDERECO ? `, ${ENDERECO}` : "";
// TODO: e-mail de contato do Radar dos Achados (aparece no rodapé e nas páginas legais).
export const EMAIL_CONTATO = "[e-mail de contato]";

// Linha exibida no fim de cada página legal.
export const LINHA_EMPRESA = `${RAZAO_SOCIAL} (${NOME_FANTASIA}) · CNPJ ${CNPJ}${ENDERECO ? ` · ${ENDERECO}` : ""} · Dúvidas: ${EMAIL_CONTATO}`;
