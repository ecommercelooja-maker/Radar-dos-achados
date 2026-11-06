"use client";

import { useEffect, useRef, useState } from "react";
import { IconeTelegram, IconeWhats } from "@/components/Marca";
import { ADS_ID, CHAVE_COOKIES, MARCA, SITE_URL, TEXTO_INDICACAO } from "@/config";
import { converter, rastrear } from "@/lib/rastreio";

/* ------------------------------------------------------------------ */
/* Efeitos da página: revelar ao rolar, topo compacto, seção ativa e   */
/* conversão em todo clique para entrar em grupo.                      */
/* ------------------------------------------------------------------ */
export function Efeitos() {
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.add("js");

    const rolar = () => raiz.classList.toggle("rolou", window.scrollY > 40);
    rolar();
    window.addEventListener("scroll", rolar, { passive: true });

    // Elementos .rv aparecem quando entram na tela.
    const revelar = new IntersectionObserver(
      (ens) =>
        ens.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("rv-on");
          revelar.unobserve(en.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => revelar.observe(el));

    // Link do menu da seção visível fica marcado.
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".topo-nav a[href^='#']")];
    const ativo = new IntersectionObserver(
      (ens) =>
        ens.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("ativo", a.hash === `#${en.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((a) => {
      const s = document.querySelector(a.hash);
      if (s) ativo.observe(s);
    });

    // Todo clique para entrar em grupo vira conversão do Google Ads e evento entrar_grupo.
    // Listener delegado, sem preventDefault: os eventos vão por beacon e a navegação segue normal.
    const clique = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='/g/']");
      if (!a) return;
      converter();
      rastrear("entrar_grupo", {
        grupo: a.pathname.split("/")[2] || "ofertas",
        plataforma: a.search.includes("telegram") ? "telegram" : "whatsapp",
        origem: a.closest("[data-origem]")?.getAttribute("data-origem") || "pagina",
      });
    };
    document.addEventListener("click", clique);

    return () => {
      window.removeEventListener("scroll", rolar);
      revelar.disconnect();
      ativo.disconnect();
      document.removeEventListener("click", clique);
    };
  }, []);
  return null;
}

/* Vídeo em loop (Mixkit): só baixa quando chega perto da tela e pausa fora dela. Com "reduzir movimento", fica na capa. */
export function VideoLoop({ nome, className = "", rotulo }: { nome: string; className?: string; rotulo?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          if (!v.src) v.src = `/video/${nome}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [nome]);
  return (
    <video
      ref={ref}
      className={className}
      poster={`/video/${nome}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    />
  );
}

/* Barra de CTA fixa no rodapé do celular: aparece depois que o topo da página sai da tela. */
export function CtaFixa({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`cta-fixa${on ? " on" : ""}`} aria-hidden={!on} data-origem="cta-fixa">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Indicar para amigos                                                 */
/* ------------------------------------------------------------------ */
export function Indicar() {
  const [copiado, setCopiado] = useState(false);
  const [nativo, setNativo] = useState(false);
  const url = `${SITE_URL}/?ref=indicacao`;

  useEffect(() => setNativo(typeof navigator !== "undefined" && !!navigator.share), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      rastrear("compartilhar", { canal: "copiar_link" });
      setTimeout(() => setCopiado(false), 1800);
    } catch {}
  };
  const compartilhar = async () => {
    try {
      await navigator.share({ title: MARCA, text: TEXTO_INDICACAO, url });
      rastrear("compartilhar", { canal: "nativo" });
    } catch {}
  };

  return (
    <div className="indique-botoes">
      <a
        className="btn btn-sinal"
        href={`https://wa.me/?text=${encodeURIComponent(TEXTO_INDICACAO + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => rastrear("compartilhar", { canal: "whatsapp" })}
      >
        <IconeWhats /> Enviar no WhatsApp
      </a>
      <a
        className="btn btn-contorno"
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(TEXTO_INDICACAO)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => rastrear("compartilhar", { canal: "telegram" })}
      >
        <IconeTelegram /> Telegram
      </a>
      <button type="button" className="btn btn-contorno" onClick={copiar}>
        {copiado ? "✓ Link copiado" : "Copiar link"}
      </button>
      {nativo && (
        <button type="button" className="btn btn-contorno" onClick={compartilhar}>
          Mais opções
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aviso de cookies (LGPD) + Consent Mode v2 do Google.                 */
/* A tag é carregada no layout raiz (só com NEXT_PUBLIC_GADS_ID), já    */
/* com tudo "denied" e aplicando a escolha salva em visitas anteriores. */
/* ------------------------------------------------------------------ */
type JanelaMedicao = Window & { gtag?: (...a: unknown[]) => void };

export function Cookies() {
  const [mostrar, setMostrar] = useState(false);
  const ativa = Boolean(ADS_ID);

  useEffect(() => {
    if (!ativa) return;
    let v: string | null = null;
    try {
      v = localStorage.getItem(CHAVE_COOKIES);
    } catch {}
    if (v !== "sim" && v !== "nao") setMostrar(true);
  }, [ativa]);

  const decidir = (sim: boolean) => {
    try {
      localStorage.setItem(CHAVE_COOKIES, sim ? "sim" : "nao");
    } catch {}
    if (sim) {
      (window as JanelaMedicao).gtag?.("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
    setMostrar(false);
  };

  if (!mostrar) return null;
  return (
    <div className="cookies" role="region" aria-label="Aviso de cookies">
      <p>
        Usamos cookies para medir as visitas e os anúncios. Eles só são ativados com o seu aceite. Veja a{" "}
        <a href="/cookies">política de cookies</a>.
      </p>
      <div className="cookies-botoes">
        <button type="button" className="btn btn-contorno" onClick={() => decidir(false)}>
          Recusar
        </button>
        <button type="button" className="btn btn-sinal" onClick={() => decidir(true)}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
