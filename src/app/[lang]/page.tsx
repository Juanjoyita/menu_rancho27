import { redirect } from "next/navigation";

// Temporal: en el Paso 5 esta página será la landing (logo, redes y botón
// "Ver menú"). Mientras tanto, /es y /en llevan directo al menú.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  redirect(`/${lang}/menu`);
}
