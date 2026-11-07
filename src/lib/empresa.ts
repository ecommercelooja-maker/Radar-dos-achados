// Dados da empresa responsável pelo site. Único lugar para alterar: rodapé e páginas legais leem daqui.
// TODO: endereço do cartão CNPJ antes de anunciar no Google Ads.

export const RAZAO_SOCIAL = "SETI SEGURANCA E TECNOLOGIA NA INTERNET LTDA";
// Nome fantasia. Vazio: some do rodapé e das páginas legais.
export const NOME_FANTASIA = "";
export const CNPJ = "05.348.924/0001-05";
// Endereço de registro (cartão CNPJ). Vazio: o endereço some do rodapé e das páginas legais.
export const ENDERECO = "";
// ", endereço" pronto para colar depois do CNPJ (vazio quando não há endereço).
export const ENDERECO_SUFIXO = ENDERECO ? `, ${ENDERECO}` : "";
// E-mail de contato (aparece no rodapé e nas páginas legais).
export const EMAIL_CONTATO = "suporte@oradardosachados.com";

// Linha exibida no fim de cada página legal.
export const LINHA_EMPRESA = `${RAZAO_SOCIAL}${NOME_FANTASIA ? ` (${NOME_FANTASIA})` : ""} · CNPJ ${CNPJ}${ENDERECO ? ` · ${ENDERECO}` : ""} · Dúvidas: ${EMAIL_CONTATO}`;
