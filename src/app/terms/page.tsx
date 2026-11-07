import type { Metadata } from "next";
import Link from "next/link";

import { CompanyDetails, LegalPage } from "@/components/legal/legal-page";
import { medicalDisclaimer } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pogoji uporabe",
  description: "Pogoji uporabe spletne strani Medcore.",
  path: "/terms",
});

// Opomba: besedilo je pripravljeno kot strokovna predloga. Pred objavo naj ga
// pregleda pravni svetovalec.
export default function TermsPage() {
  return (
    <LegalPage
      title="Pogoji uporabe"
      intro="Ti pogoji urejajo uporabo spletne strani Medcore. Z uporabo spletne strani potrjujete, da se s pogoji strinjate."
    >
      <h2>1. Upravljavec spletne strani</h2>
      <CompanyDetails />

      <h2>2. Namen vsebin</h2>
      <p>
        Vsebine na spletni strani so informativne narave in predstavljajo tehnologije, ki jih Medcore zastopa
        ali uvaja na slovenski trg. Ne predstavljajo zavezujoče ponudbe. Dostopnost izdelkov, njihove
        lastnosti in regulativni status se lahko spremenijo.
      </p>

      <h2>3. Medicinsko obvestilo</h2>
      <p>{medicalDisclaimer}</p>
      <p>
        Medicinske pripomočke je treba uporabljati v skladu z navodili za uporabo proizvajalca in, kadar je to
        predvideno, pod nadzorom usposobljenega zdravstvenega osebja. Pri vprašanjih o svojem zdravju se vedno
        posvetujte z zdravnikom ali drugim zdravstvenim strokovnjakom.
      </p>

      <h2>4. Blagovne znamke in avtorske pravice</h2>
      <p>
        Imena izdelkov, blagovne znamke in logotipi proizvajalcev so last njihovih imetnikov in so na spletni
        strani uporabljeni zgolj za opis zastopanih izdelkov. Druge vsebine spletne strani (besedila,
        oblikovanje, grafike) so zaščitene z avtorskimi pravicami in jih brez predhodnega pisnega dovoljenja
        ni dovoljeno kopirati ali razširjati.
      </p>

      <h2>5. Povezave na zunanje spletne strani</h2>
      <p>
        Spletna stran vsebuje povezave na spletne strani proizvajalcev in drugih tretjih oseb. Za vsebino in
        varstvo podatkov na teh straneh ne odgovarjamo.
      </p>

      <h2>6. Omejitev odgovornosti</h2>
      <p>
        Prizadevamo si, da so informacije točne in ažurne, vendar ne jamčimo za njihovo popolnost. V obsegu,
        ki ga dopušča zakonodaja, ne odgovarjamo za škodo, ki bi nastala zaradi uporabe informacij s spletne
        strani ali zaradi začasne nedosegljivosti spletne strani.
      </p>

      <h2>7. Varstvo osebnih podatkov</h2>
      <p>
        Obdelava osebnih podatkov je opisana v <Link href="/privacy">politiki zasebnosti</Link>.
      </p>

      <h2>8. Spremembe pogojev</h2>
      <p>Pogoje uporabe lahko kadar koli posodobimo. Veljavna različica je vedno objavljena na tej strani.</p>

      <h2>9. Veljavno pravo</h2>
      <p>
        Za te pogoje velja pravo Republike Slovenije. Morebitne spore bomo poskušali rešiti sporazumno, sicer
        jih rešuje stvarno pristojno sodišče v Ljubljani.
      </p>
    </LegalPage>
  );
}
