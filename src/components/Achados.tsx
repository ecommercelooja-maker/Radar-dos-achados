/* eslint-disable @next/next/no-img-element */
import { MARCA, MOSTRAR_PRECOS, NICHOS, type Nicho } from "@/config";
import { IconeRadar } from "@/components/Marca";
import dados from "@/data/ofertas.json";

type Exemplo = {
  ativo: boolean;
  nome: string;
  imagem: string;
  loja: string;
  nicho: Nicho;
  precoDe: string;
  precoPor: string;
};

const EXEMPLOS = (dados.ofertas as Exemplo[]).filter((o) => o.ativo);

// Placeholder "R$ 0,00" nunca vai para a página, mesmo com MOSTRAR_PRECOS ligado.
const temPreco = (o: Exemplo) => MOSTRAR_PRECOS && !/^R\$\s*0,00$/.test(o.precoPor.trim());

function Precos({ o }: { o: Exemplo }) {
  if (!temPreco(o)) return null;
  return (
    <p className="sinal-precos">
      <s>
        <span className="sr">De </span>
        {o.precoDe}
      </s>
      <b>
        <span className="sr">Por </span>
        {o.precoPor}
      </b>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Tela do radar (topo). O feixe dá uma volta a cada VOLTA segundos e  */
/* cada ponto acende quando o feixe passa pelo ângulo dele.            */
/* ------------------------------------------------------------------ */
const VOLTA = 6;

// Ângulo em graus (0 = topo, sentido horário) e distância do centro (% do raio).
const POS_PRODUTOS: [number, number][] = [
  [58, 62],
  [215, 64],
  [295, 50],
];
const POS_PONTOS: [number, number][] = [
  [18, 82],
  [112, 40],
  [222, 84],
  [330, 30],
  [250, 66],
];

function posicao([ang, dist]: [number, number]) {
  const rad = (ang * Math.PI) / 180;
  return {
    left: `${(50 + (dist / 2) * Math.sin(rad)).toFixed(2)}%`,
    top: `${(50 - (dist / 2) * Math.cos(rad)).toFixed(2)}%`,
    // Atraso negativo: a animação já começa no ponto certo da volta.
    animationDelay: `${((ang / 360) * VOLTA - VOLTA).toFixed(2)}s`,
  };
}

export function TelaRadar() {
  const produtos = EXEMPLOS.slice(0, POS_PRODUTOS.length);
  return (
    <div className="radar" role="img" aria-label={`Ilustração de um radar captando achadinhos para o grupo do ${MARCA}`}>
      <div className="radar-tela" aria-hidden="true" style={{ ["--volta" as string]: `${VOLTA}s` }}>
        <span className="radar-anel radar-anel-1" />
        <span className="radar-anel radar-anel-2" />
        <span className="radar-anel radar-anel-3" />
        <span className="radar-cruz" />
        <span className="radar-feixe" />
        <span className="radar-centro">
          <IconeRadar cor="#071824" />
        </span>
        {POS_PONTOS.map((p, i) => (
          <span key={i} className="radar-ponto" style={posicao(p)} />
        ))}
        {produtos.map((o, i) => (
          <span key={o.imagem} className="radar-alvo" style={posicao(POS_PRODUTOS[i])}>
            <img src={o.imagem} alt="" />
          </span>
        ))}
        <span className="radar-grau radar-grau-n">000°</span>
        <span className="radar-grau radar-grau-l">090°</span>
        <span className="radar-grau radar-grau-s">180°</span>
        <span className="radar-grau radar-grau-o">270°</span>
      </div>
    </div>
  );
}

/* Cartão de alerta que aparece ao lado do radar (ilustrativo, sem preço e sem link). */
export function AlertaFlutuante() {
  const o = EXEMPLOS[1] ?? EXEMPLOS[0];
  if (!o) return null;
  return (
    <div className="alerta-flutuante" aria-hidden="true">
      <img src={o.imagem} alt="" />
      <span>
        <small>
          <i /> Sinal confirmado
        </small>
        <b>{o.nome}</b>
        <em>Loja: {o.loja}</em>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grade de exemplos estáticos ("sinais já captados"): sem link.        */
/* ------------------------------------------------------------------ */
export function GradeSinais() {
  return (
    <div className="sinais">
      {EXEMPLOS.map((o, i) => (
        <article key={o.imagem} className="sinal rv" style={{ transitionDelay: `${i * 80}ms` }}>
          <div className="sinal-foto">
            <img src={o.imagem} alt={o.nome} loading="lazy" />
            <span className="sinal-selo">
              <i aria-hidden="true" /> Sinal confirmado
            </span>
          </div>
          <div className="sinal-corpo">
            <p className="sinal-meta">
              <span>{NICHOS[o.nicho]}</span>
              <span>#{String(i + 1).padStart(3, "0")}</span>
            </p>
            <h3>{o.nome}</h3>
            <Precos o={o} />
            <p className="sinal-loja">Loja: {o.loja}</p>
            <p className="sinal-nota">Exemplo ilustrativo de achadinho já divulgado. Preço e estoque mudam na loja.</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* Notificações empilhadas: como o alerta chega no celular. Ilustrativo, sem preço e sem link. */
export function Notificacoes() {
  const itens = EXEMPLOS.slice(0, 2);
  return (
    <div className="notifs" role="img" aria-label={`Ilustração de alertas de achadinhos chegando no WhatsApp pelo grupo do ${MARCA}`}>
      <div aria-hidden="true">
        {itens.map((o, i) => (
          <div key={o.imagem} className="notif" style={{ animationDelay: `${0.3 + i * 0.7}s` }}>
            <span className="notif-icone">
              <IconeRadar cor="#2ee59d" />
            </span>
            <span className="notif-texto">
              <small>
                {MARCA} · {["agora", "há 2 min"][i]}
              </small>
              <b>📡 Sinal forte: {o.nome}</b>
              <em>Loja: {o.loja} · link da loja na mensagem</em>
            </span>
            <img src={o.imagem} alt="" />
          </div>
        ))}
        <div className="notif notif-curta" style={{ animationDelay: "1.7s" }}>
          <span className="notif-icone">
            <IconeRadar cor="#2ee59d" />
          </span>
          <span className="notif-texto">
            <small>{MARCA} · há 3 min</small>
            <b>✅ Desconto conferido no histórico</b>
            <em>Cupom testado no carrinho. Compra direto no site da loja.</em>
          </span>
        </div>
        <p className="notifs-legenda">Exemplo ilustrativo</p>
      </div>
    </div>
  );
}
