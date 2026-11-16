import type { Metadata } from "next";
import Link from "next/link";

import { CompanyDetails, LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Politika zasebnosti",
  description: "Kako Medcore zbira, uporablja in varuje osebne podatke, posredovane prek spletne strani.",
  path: "/privacy",
});

// Opomba: besedilo je pripravljeno kot strokovna predloga. Pred objavo naj ga
// pregleda pravni svetovalec oziroma pooblaščena oseba za varstvo podatkov.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politika zasebnosti"
      intro="Zbiramo le podatke, ki jih potrebujemo za odgovor na vaše povpraševanje in za pošiljanje novičk, na katere se prijavite. V tej politiki pojasnjujemo, katere podatke obdelujemo, zakaj in kakšne pravice imate."
    >
      <h2>1. Upravljavec osebnih podatkov</h2>
      <p>Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:</p>
      <CompanyDetails />

      <h2>2. Katere podatke zbiramo</h2>
      <h3>Povpraševanje za produkt</h3>
      <ul>
        <li>e-poštni naslov,</li>
        <li>
          izbrani produkt, ime ali povezavo do produkta, ki ga ni na platformi, oziroma tehnologijo, ki jo
          raziskujete,
        </li>
        <li>ali povpraševanje oddajate kot posameznik ali strokovni uporabnik.</li>
      </ul>
      <h3>Novičke</h3>
      <ul>
        <li>e-poštni naslov,</li>
        <li>besedilo in čas privolitve ter morebitni čas odjave.</li>
      </ul>
      <h3>Raziskovanje po potrebah</h3>
      <p>
        Izbire v raziskovalniku (predel telesa, stanje ali cilj) se obdelajo samo v vašem brskalniku. Ne
        pošiljamo jih na strežnik in jih ne shranjujemo.
      </p>
      <p>Ne zbiramo zdravstvene dokumentacije ali podatkov o diagnozi. Prosimo, da jih ne pošiljate.</p>
      <h3>Prejšnji obrazci</h3>
      <p>
        Podatke, ki ste jih oddali prek prejšnjih obrazcev spletne strani (prijava na obvestila o dostopnosti
        izdelkov in kontaktni obrazec), obdelujemo samo za namen, za katerega ste jih oddali.
      </p>
      <h3>Tehnični podatki</h3>
      <p>
        Ob obisku spletne strani ponudnik gostovanja samodejno obdeluje tehnične podatke (npr. IP-naslov,
        vrsto brskalnika in čas dostopa), ki so potrebni za delovanje, varnost in zaščito pred zlorabami.
      </p>

      <h2>3. Nameni in pravne podlage obdelave</h2>
      <ul>
        <li>
          <strong>Odgovor na povpraševanje in priprava ponudbe</strong> — na podlagi ukrepov na vašo zahtevo
          pred morebitno sklenitvijo pogodbe oziroma našega zakonitega interesa za komunikacijo z uporabniki
          (točki (b) in (f) prvega odstavka 6. člena Splošne uredbe o varstvu podatkov, GDPR).
        </li>
        <li>
          <strong>Pošiljanje novičk</strong> — na podlagi vaše privolitve (točka (a) prvega odstavka 6. člena
          GDPR). Privolitev lahko kadar koli prekličete z odjavo.
        </li>
        <li>
          <strong>Obvestila o dostopnosti izdelkov (prejšnji obrazec)</strong> — na podlagi vaše privolitve
          (točka (a) prvega odstavka 6. člena GDPR).
        </li>
        <li>
          <strong>Varnost in delovanje spletne strani</strong> — na podlagi zakonitega interesa (točka (f)
          prvega odstavka 6. člena GDPR).
        </li>
      </ul>

      <h2>4. Rok hrambe</h2>
      <p>
        Podatke iz povpraševanja hranimo toliko časa, kolikor je potrebno za obravnavo povpraševanja, pripravo
        ponudbe in morebitno izvedbo naročila. Podatke za novičke hranimo do odjave; po odjavi hranimo le
        podatek o privolitvi in odjavi, kolikor je to potrebno za dokazovanje skladnosti s predpisi. Po izteku
        roka podatke izbrišemo.
      </p>

      <h2>5. Obdelovalci in prenosi podatkov</h2>
      <p>
        Za delovanje spletne strani uporabljamo zunanje ponudnike storitev, ki podatke obdelujejo v našem
        imenu in po naših navodilih:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — gostovanje spletne strani,
        </li>
        <li>
          <strong>Supabase Inc.</strong> — varna hramba podatkov, posredovanih prek obrazcev.
        </li>
      </ul>
      <p>
        Če bomo za pošiljanje novičk uporabili zunanjo storitev, jo bomo navedli v tej politiki. Če se podatki
        prenašajo v države zunaj Evropskega gospodarskega prostora, se prenos izvaja na podlagi ustreznih
        zaščitnih ukrepov v skladu s poglavjem V GDPR (na primer standardnih pogodbenih klavzul Evropske
        komisije). Osebnih podatkov ne prodajamo in jih ne posredujemo tretjim osebam za njihove trženjske
        namene.
      </p>

      <h2>6. Piškotki</h2>
      <p>
        Spletna stran ne uporablja piškotkov za oglaševanje ali analitiko. Če bomo v prihodnje uvedli tovrstna
        orodja, bomo predhodno pridobili vašo privolitev in to politiko ustrezno posodobili.
      </p>

      <h2>7. Vaše pravice</h2>
      <p>V skladu z GDPR imate pravico do:</p>
      <ul>
        <li>dostopa do svojih osebnih podatkov,</li>
        <li>popravka netočnih podatkov,</li>
        <li>izbrisa podatkov („pravica do pozabe“),</li>
        <li>omejitve obdelave,</li>
        <li>prenosljivosti podatkov,</li>
        <li>ugovora obdelavi, ki temelji na zakonitem interesu,</li>
        <li>preklica privolitve kadar koli, ne da bi to vplivalo na zakonitost obdelave pred preklicem.</li>
      </ul>
      <p>
        Od novičk se lahko kadar koli odjavite na strani <Link href="/odjava">Odjava od novičk</Link>. Za
        uveljavljanje drugih pravic nam pišite na{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. Če menite, da obdelava
        vaših podatkov ni skladna s predpisi, lahko vložite pritožbo pri Informacijskem pooblaščencu Republike
        Slovenije (
        <a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer">
          www.ip-rs.si
        </a>
        ).
      </p>

      <h2>8. Spremembe politike zasebnosti</h2>
      <p>
        Politiko zasebnosti lahko občasno posodobimo. Veljavna različica je vedno objavljena na tej strani.
        Glejte tudi <Link href="/terms">pogoje uporabe</Link>.
      </p>
    </LegalPage>
  );
}
