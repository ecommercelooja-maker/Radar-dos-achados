/* eslint-disable @next/next/no-img-element */

/* Emoji animado (Google Noto Animated Emoji, CC BY 4.0), em /public/anim. Decorativo. */
export function Anim({ n, t = 40, className = "" }: { n: string; t?: number; className?: string }) {
  return <img className={`anim ${className}`} src={`/anim/${n}.webp`} alt="" aria-hidden="true" width={t} height={t} loading="lazy" />;
}

// Foto responsiva (Unsplash, em /public/fotos): o navegador escolhe entre 640 e 1280px.
export function Foto({
  nome,
  alt = "",
  sizes = "(min-width: 900px) 50vw, 100vw",
  className,
  prioridade = false,
}: {
  nome: string;
  alt?: string;
  sizes?: string;
  className?: string;
  prioridade?: boolean;
}) {
  const base = `/fotos/${nome}`;
  return (
    <img
      className={className}
      src={`${base}-1280.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`}
      sizes={sizes}
      alt={alt}
      loading={prioridade ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
