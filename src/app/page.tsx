import { AlertaFlutuante, GradeSinais, Notificacoes, TelaRadar } from "@/components/Achados";
import { Indicar, VideoLoop } from "@/components/Cliente";
import { Icone } from "@/components/Marca";
import { Anim, Foto } from "@/components/Midia";
import { Botoes, Cabecalho, Globais, Rodape, TEM_TELEGRAM } from "@/components/Site";
import { LOJAS, LOJAS_TEXTO, TEXTO_AFILIADO } from "@/config";

// Do sinal ao alerta: as 4 etapas da varredura.
const ETAPAS = [
  { icone: "varredura", titulo: "Varredura", texto: `Passamos o radar por ${LOJAS_TEXTO} ao longo do dia, atrás de queda de preço.` },
  { icone: "sinal", titulo: "Sinal", texto: "Preço caiu? Comparamos com o histórico. Desconto inflado é ruído e é descartado." },
  { icone: "check", titulo: "Confirmação", texto: "Testamos o cupom no carrinho e damos preferência a vendedores bem avaliados." },
  { icone: "sino", titulo: "Alerta", texto: "O achadinho chega no grupo com foto e link da loja. Você compra direto no site dela, se quiser." },
];

const FREQUENCIAS = [
  { foto: "sala", alt: "Sala de estar decorada com sofá e plantas", emoji: "casa", titulo: "Casa e cozinha", texto: "Organizadores, utensílios e aquele item que resolve a rotina." },
  { foto: "fone", alt: "Fone de ouvido sobre fundo amarelo", emoji: "relampago", titulo: "Eletrônicos", texto: "Fones, carregadores, câmeras e gadgets com desconto conferido." },
  { foto: "serum", alt: "Frasco de sérum com conta-gotas", emoji: "coracao-brilho", titulo: "Beleza e cuidados", texto: "Skincare, cabelo e perfumaria quando o preço cai de verdade." },
  { foto: "garrafa", alt: "Garrafa térmica verde", emoji: "lampada", titulo: "Utilidades", texto: "Achadinhos baratos e úteis que ninguém sabia que precisava." },
];

const CALIBRADO: [string, string, string][] = [
  ["gratis", "Gratuito de verdade", "Sem mensalidade, sem assinatura e sem área paga. Você não paga nada para receber os alertas."],
  ["mudo", "Grupo silencioso", "Só o administrador envia mensagens. Ninguém te chama no privado e dá para deixar no silencioso."],
  ["alvo", "Só sinal forte", "Melhor mandar menos e só o que vale a pena do que lotar seu celular de oferta repetida."],
];

const MANTEMOS: [string, string][] = [
  ["A loja é quem paga", "Quando você compra pelo nosso link, a loja nos repassa uma comissão. Seu preço é exatamente o mesmo."],
  ["Só vale se o achadinho for bom", "Oferta ruim ninguém compra. Nosso interesse é o mesmo que o seu: desconto que valha a pena."],
  ["Não vendemos nada", "Sem estoque, sem pagamento, sem cadastro. Quem vende, cobra e entrega é a loja."],
  ["Gratuito de verdade", "Não existe plano pago nem conteúdo exclusivo para assinante. Entra e sai quando quiser."],
];

const COMPROMISSOS: [string, string][] = [
  ["Ninguém te chama no privado.", "Só o administrador envia e o grupo é fechado para conversa."],
  ["Sem e-mail, sem CPF, sem cadastro.", "Você entra pelo convite do próprio WhatsApp."],
  ["Desconto falso não dispara alerta.", "Se o preço não caiu de verdade, o achadinho não é enviado."],
  ["A compra é na loja.", "Pagamento, entrega e garantia são da loja onde você comprar."],
];

const DUVIDAS: [string, string][] = [
  ["É pago?", "Não. O Radar dos Achados é gratuito, sem mensalidade e sem área exclusiva para assinante."],
  [
    "Vocês ganham alguma coisa com os links?",
    `Sim. Participamos dos programas de afiliados de lojas como ${LOJAS_TEXTO} e recebemos uma comissão quando você compra pelo nosso link, sem nenhum custo extra para você. É isso que mantém o grupo funcionando.`,
  ],
  ["Vocês vendem os produtos?", "Não. Não somos loja. A compra, o pagamento, a entrega e a garantia são da loja, e qualquer questão do pedido é resolvida direto com ela."],
  [
    "Meu número fica visível?",
    "O grupo é fechado para conversa: só o administrador envia mensagens, então ninguém te chama no privado. Como em qualquer grupo do WhatsApp, os participantes podem ver o número uns dos outros.",
  ],
  ["Quantas mensagens por dia?", "Só o que vale a pena. Se achar muito, dá para silenciar o grupo sem sair, o próprio WhatsApp permite."],
  ["Como faço para sair?", "Pelo próprio WhatsApp, em dois toques, quando quiser. Sem precisar avisar ninguém."],
];

// Onda "ruído": vários picos pequenos e irregulares. Onda "sinal": linha calma com um pico forte.
const RUIDO = Array.from({ length: 41 }, (_, i) => {
  const y = 60 + Math.round(Math.sin(i * 1.7) * 18 + Math.cos(i * 3.1) * 12);
  return `${i * 10},${y}`;
}).join(" ");
const SINAL = "0,60 150,60 175,58 185,14 195,104 205,50 215,60 400,60";

export default function Home() {
  return (
    <>
      <Cabecalho home />

      {/* Topo: chamada + radar captando os achados */}
      <header className="hero" data-origem="hero">
        <div className="hero-grade-fundo" aria-hidden="true" />
        <div className="wrap hero-grade">
          <div className="hero-texto">
            <p className="selo">
              <span className="selo-ponto" aria-hidden="true" /> Grupo gratuito de achadinhos no WhatsApp
              {TEM_TELEGRAM && " e no Telegram"}
            </p>
            <h1>
              Achadinhos no radar.
              <em> Você só recebe o alerta.</em>
            </h1>
            <p className="hero-sub">
              A gente vasculha as lojas online atrás de achadinhos de <b>casa, cozinha, beleza e eletrônicos</b>, confere
              se o desconto é real e só avisa quando o sinal é forte.
            </p>
            <Botoes escuro texto="Quero receber os alertas" />
            <ul className="hero-garantias">
              <li>Gratuito</li>
              <li>Sem cadastro</li>
              <li>Só o admin envia</li>
            </ul>
          </div>

          <div className="hero-radar">
            <TelaRadar />
            <AlertaFlutuante />
            <span className="chip chip-1" aria-hidden="true">
              <Anim n="check" t={22} /> Cupom testado
            </span>
          </div>
        </div>
      </header>

      {/* Lojas: só o nome, em texto (sem logotipos) */}
      <section className="lojas" aria-label="Lojas no radar">
        <div className="lojas-trilho" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              <span className="lojas-rotulo">Lojas no radar</span>
              {LOJAS.map((l) => (
                <span key={l} className="lojas-nome">
                  {l}
                </span>
              ))}
            </span>
          ))}
        </div>
        <p className="sr">Lojas onde procuramos achadinhos: {LOJAS_TEXTO}.</p>
      </section>

      <main>
        {/* Como funciona: do sinal ao alerta */}
        <section className="secao" id="varredura">
          <div className="wrap">
            <p className="sobretitulo rv">Como funciona</p>
            <h2 className="titulo rv">Do sinal ao alerta, em 4 etapas</h2>
            <p className="sub rv">Muita coisa aparece na tela, pouca coisa dispara alerta. Cada etapa tira o que não vale o seu dinheiro.</p>
            <ol className="etapas">
              {ETAPAS.map((e, i) => (
                <li key={e.titulo} className="etapa rv" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="etapa-no">
                    <Icone n={e.icone} t={26} />
                  </span>
                  <span className="etapa-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{e.titulo}</h3>
                  <p>{e.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ruído x sinal */}
        <section className="secao secao-escura ruido" aria-labelledby="ruido-titulo">
          <div className="wrap ruido-grade">
            <div className="rv">
              <p className="sobretitulo claro esquerda">Filtro de ruído</p>
              <h2 className="titulo claro esquerda" id="ruido-titulo">
                A internet tem muito ruído.
                <br />
                <em>O radar só dispara com sinal.</em>
              </h2>
              <p className="sub claro esquerda">
                Todo dia aparece “promoção imperdível” que não é promoção. A gente ignora o barulho e só manda o achadinho
                quando o preço caiu de verdade.
              </p>
            </div>
            <div className="ondas rv" aria-hidden="true">
              <div className="onda">
                <span className="onda-rotulo">Ruído · ignorado</span>
                <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                  <polyline points={RUIDO} />
                </svg>
              </div>
              <div className="onda onda-sinal">
                <span className="onda-rotulo">Sinal · vira alerta</span>
                <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                  <polyline points={SINAL} />
                  <circle cx="185" cy="14" r="6" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Frequências (categorias) */}
        <section className="secao secao-papel">
          <div className="wrap">
            <p className="sobretitulo rv">Frequências monitoradas</p>
            <h2 className="titulo rv">Achadinhos pra casa toda</h2>
            <div className="frequencias">
              {FREQUENCIAS.map((c, i) => (
                <article key={c.titulo} className="frequencia rv" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="frequencia-foto">
                    <Foto nome={c.foto} alt={c.alt} sizes="(min-width: 1000px) 280px, (min-width: 640px) 45vw, 92vw" />
                    <span className="frequencia-canal">Canal {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="frequencia-corpo">
                    <Anim n={c.emoji} t={36} />
                    <h3>{c.titulo}</h3>
                    <p>{c.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Exemplos estáticos */}
        <section className="secao" id="sinais" data-origem="exemplos">
          <div className="wrap">
            <p className="sobretitulo rv">Exemplos</p>
            <h2 className="titulo rv">Sinais que já viraram alerta</h2>
            <p className="sub rv">
              Alguns achadinhos que já divulgamos. Os do dia, com preço e link da loja, são enviados dentro do grupo.
            </p>
            <GradeSinais />
            <div className="centro">
              <Botoes texto="Participar do grupo gratuito" />
            </div>
          </div>
        </section>

        {/* O alerta chega no celular */}
        <section className="secao secao-escura celular-secao" data-origem="alerta">
          <div className="wrap celular-grade">
            <div className="celular-midia rv">
              <VideoLoop nome="celular" rotulo="Pessoa olhando ofertas no celular" />
              <Notificacoes />
            </div>
            <div className="rv">
              <p className="sobretitulo claro esquerda">
                <Anim n="sino" t={22} /> O alerta
              </p>
              <h2 className="titulo claro esquerda">Apita no seu WhatsApp. Você decide se compra.</h2>
              <ul className="lista-check claro">
                <li>Foto, nome do produto e loja em cada alerta.</li>
                <li>O link leva direto para o site da loja.</li>
                <li>Deixe o grupo silenciado e abra quando for comprar.</li>
              </ul>
              <Botoes escuro texto="Ligar o radar" />
            </div>
          </div>
        </section>

        {/* Por que confiar */}
        <section className="secao" id="calibrado">
          <div className="wrap">
            <p className="sobretitulo rv">Por que confiar</p>
            <h2 className="titulo rv">Radar calibrado pra você</h2>
            <div className="calibrado">
              {CALIBRADO.map(([icone, t, p], i) => (
                <article key={t} className="calibrado-card rv" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="calibrado-icone">
                    <Icone n={icone} t={28} />
                  </span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como nos mantemos (divulgação de afiliados) */}
        <section className="secao secao-papel" id="como-nos-mantemos">
          <div className="wrap mantemos">
            <div className="mantemos-texto rv">
              <p className="sobretitulo esquerda">A pergunta de todo mundo</p>
              <h2 className="titulo esquerda">&ldquo;Se é grátis, como vocês ganham?&rdquo;</h2>
              <p className="mantemos-aviso">{TEXTO_AFILIADO}</p>
              <div className="mantemos-foto">
                <Foto nome="compra-cartao" alt="Pessoa fazendo uma compra online com cartão no notebook" sizes="(min-width: 900px) 460px, 92vw" />
                <span className="mantemos-selo">
                  <Anim n="joinha" t={32} />
                  <span>
                    <b>Comissão da loja</b>
                    <small>o seu preço não muda</small>
                  </span>
                </span>
              </div>
            </div>
            <ol className="mantemos-lista">
              {MANTEMOS.map(([t, p], i) => (
                <li key={t} className="rv" style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Compromissos */}
        <section className="secao">
          <div className="wrap compromisso rv">
            <div>
              <p className="sobretitulo esquerda">Combinado</p>
              <h2 className="titulo esquerda">Nosso compromisso com você</h2>
              <div className="compromisso-midia">
                <VideoLoop nome="entrega" rotulo="Pessoa recebendo uma encomenda" />
              </div>
            </div>
            <ul>
              {COMPROMISSOS.map(([b, t]) => (
                <li key={b}>
                  <span className="compromisso-ok" aria-hidden="true">
                    <Icone n="check" t={22} />
                  </span>
                  <span>
                    <b>{b}</b> {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Indique */}
        <section className="secao secao-papel" id="indique">
          <div className="wrap">
            <div className="indique rv">
              <div className="indique-ondas" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <Anim n="presente" t={64} className="indique-anim" />
              <p className="sobretitulo claro">Amplie o sinal</p>
              <h2 className="titulo claro">Conhece alguém que ama um achadinho?</h2>
              <p className="sub claro">
                Mande o link do grupo para a família, os amigos ou aquele grupo do trabalho. Ajude quem você gosta a pagar
                menos.
              </p>
              <Indicar />
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <section className="secao" id="duvidas">
          <div className="wrap estreito">
            <p className="sobretitulo rv">Dúvidas</p>
            <h2 className="titulo rv">Ficou alguma dúvida?</h2>
            <div className="duvidas rv">
              {DUVIDAS.map(([q, r], i) => (
                <details key={q} open={i === 0}>
                  <summary>{q}</summary>
                  <p>{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Fechamento */}
        <section className="fechamento" data-origem="fechamento">
          <VideoLoop nome="amigas" className="fechamento-video" />
          <div className="fechamento-veu" aria-hidden="true" />
          <div className="wrap fechamento-conteudo">
            <span className="fechamento-pulso" aria-hidden="true">
              <i />
              <i />
            </span>
            <h2>
              Liga o radar.
              <br />
              <em>A gente avisa quando valer a pena.</em>
            </h2>
            <p>Gratuito e sem cadastro. Deixe silenciado e abra quando for comprar alguma coisa.</p>
            <Botoes escuro />
          </div>
        </section>
      </main>

      <Rodape home />
      <Globais />
    </>
  );
}
