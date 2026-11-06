// Dados da empresa responsável pelo site. Único lugar para alterar: rodapé e páginas legais leem daqui.
// Nome fantasia: TEC CONNECT (mesma empresa do Garimpo VIP). TODO: confirmar a empresa e o endereço do cartão CNPJ antes de anunciar no Google Ads.

export const RAZAO_SOCIAL = "TEC CONNECT CONECTIVIDADE URBANA LTDA";
export const CNPJ = "50.429.871/0001-01";
// Endereço de registro (cartão CNPJ). Vazio: o endereço some do rodapé e das páginas legais.
export const ENDERECO = "";
// ", endereço" pronto para colar depois do CNPJ (vazio quando não há endereço).
export const ENDERECO_SUFIXO = ENDERECO ? `, ${ENDERECO}` : "";
// TODO: e-mail de contato do Radar dos Achados (aparece no rodapé e nas páginas legais).
export const EMAIL_CONTATO = "[e-mail de contato]";

// Linha exibida no fim de cada página legal.
export const LINHA_EMPRESA = `${RAZAO_SOCIAL} · CNPJ ${CNPJ}${ENDERECO ? ` · ${ENDERECO}` : ""} · Dúvidas: ${EMAIL_CONTATO}`;
