// Ícone do logo: tela de radar com anéis, feixe de varredura e um sinal captado.
export function IconeRadar({ cor = "currentColor", sinal = "#ff6b3d" }: { cor?: string; sinal?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke={cor} strokeWidth="3.5" />
      <circle cx="32" cy="32" r="18" fill="none" stroke={cor} strokeWidth="2.5" opacity=".55" />
      <path d="M32 32 L32 3 A29 29 0 0 1 57.1 17.5 Z" fill={cor} opacity=".35" />
      <path d="M32 32 L57.1 17.5" stroke={cor} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="32" r="4" fill={cor} />
      <circle cx="44" cy="15" r="5" fill={sinal} />
    </svg>
  );
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`logo${claro ? " claro" : ""}`}>
      <span className="logo-icone">
        <IconeRadar />
      </span>
      <span className="logo-texto">
        <b>Radar</b> dos Achados
      </span>
    </span>
  );
}

// Ícones de traço (decorativos), no mesmo estilo do logo.
const ICONES: Record<string, React.ReactNode> = {
  varredura: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12 19 6" />
    </>
  ),
  sinal: <path d="M3 13h3l2-6 3 12 3-9 2 3h5" />,
  check: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  sino: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  gratis: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8l8 8" />
    </>
  ),
  mudo: (
    <>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </>
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
};

export function Icone({ n, t = 24 }: { n: keyof typeof ICONES | string; t?: number }) {
  return (
    <svg
      className="icone"
      width={t}
      height={t}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONES[n]}
    </svg>
  );
}

export function IconeWhats() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export function IconeTelegram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M21.4 3.6 2.9 10.7c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.8.8s.6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5zM9.6 14.4l-.4 4-1.4-4.6 10.4-6.6z" />
    </svg>
  );
}
