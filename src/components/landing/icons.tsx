// Íconos de redes sociales dibujados con líneas (heredan el color del texto).
type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.5 2.8 2.4 4.6 5.5 5" />
    </Icon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Icon {...props}>
      {/* Globo de diálogo con colita abajo a la izquierda. */}
      <path d="M5.5 17.5 3.5 20.5l5.6-.5A8.5 8.5 0 1 0 5.5 17.5z" />
      {/* Auricular de teléfono. */}
      <path
        d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l.9-1.6-2.1-1.1-.9.8a4.2 4.2 0 0 1-2-2l.8-.9-1.1-2.1z"
        fill="currentColor"
        strokeWidth="1"
      />
    </Icon>
  );
}
