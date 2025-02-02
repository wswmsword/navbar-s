import Docs from "@/components/docs";
import { fallbackLng } from "@/i18n/settings";

export default async function Home({ params: { lng = [fallbackLng] } }) {
  const lowerCaseLng = lng[0].toLowerCase();
  return <>
    <Docs lng={lowerCaseLng} />
  </>;
}
