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
      intro="Varstvo vaših osebnih podatkov jemljemo resno. V tej politiki pojasnjujemo, katere podatke zbiramo prek spletne strani, za kakšen namen jih uporabljamo in kakšne pravice imate."
    >
      <h2>1. Upravljavec osebnih podatkov</h2>
      <p>Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:</p>
      <CompanyDetails />

      <h2>2. Katere podatke zbiramo</h2>
      <h3>Prijava na obvestila o izdelkih</h3>
      <ul>
        <li>ime in priimek,</li>
        <li>e-poštni naslov,</li>
        <li>izdelek, za katerega želite prejemati obvestila,</li>
        <li>neobvezno sporočilo o tem, kaj vas zanima.</li>
      </ul>
      <h3>Kontaktni obrazec</h3>
      <ul>
        <li>ime in priimek,</li>
        <li>e-poštni naslov,</li>
        <li>vsebina sporočila.</li>
      </ul>
      <p>
        Prek obrazcev ne zbiramo podatkov o zdravstvenem stanju. Prosimo, da v sporočila ne vpisujete podatkov
        o svojem zdravju ali zdravju drugih oseb.
      </p>
      <h3>Tehnični podatki</h3>
      <p>
        Ob obisku spletne strani ponudnik gostovanja samodejno obdeluje tehnične podatke (npr. IP-naslov,
        vrsto brskalnika in čas dostopa), ki so potrebni za delovanje, varnost in zaščito pred zlorabami.
      </p>

      <h2>3. Nameni in pravne podlage obdelave</h2>
      <ul>
        <li>
          <strong>Obveščanje o izbranih izdelkih</strong> (dostopnost, nove informacije, možnosti sodelovanja)
          — na podlagi vaše privolitve (točka (a) prvega odstavka 6. člena Splošne uredbe o varstvu podatkov,
          GDPR).
        </li>
        <li>
          <strong>Odgovor na vaše sporočilo</strong> — na podlagi ukrepov na vašo zahtevo pred morebitno
          sklenitvijo pogodbe oziroma našega zakonitega interesa za komunikacijo s poslovnimi partnerji in
          uporabniki (točki (b) in (f) prvega odstavka 6. člena GDPR).
        </li>
        <li>
          <strong>Varnost in delovanje spletne strani</strong> — na podlagi zakonitega interesa (točka (f)
          prvega odstavka 6. člena GDPR).
        </li>
      </ul>

      <h2>4. Rok hrambe</h2>
      <p>
        Podatke iz prijave na obvestila hranimo do preklica privolitve oziroma dokler je to potrebno za
        obveščanje o izbranem izdelku. Podatke iz kontaktnega obrazca hranimo toliko časa, kolikor je potrebno
        za obravnavo povpraševanja in nadaljnjo komunikacijo. Po izteku roka podatke izbrišemo.
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
        Če se podatki prenašajo v države zunaj Evropskega gospodarskega prostora, se prenos izvaja na podlagi
        ustreznih zaščitnih ukrepov v skladu s poglavjem V GDPR (na primer standardnih pogodbenih klavzul
        Evropske komisije). Osebnih podatkov ne prodajamo in jih ne posredujemo tretjim osebam za njihove
        trženjske namene.
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
        Za uveljavljanje pravic nam pišite na{" "}
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
