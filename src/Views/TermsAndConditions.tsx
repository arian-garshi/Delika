import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

const ToSSection = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    width: '100%',
}));

const Header = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const Body = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    width: '100%',
}));


const termsOfService = [
    {
        header: "Innledning",
        body: "Velkommen til Alkymisten. Ved å bruke tjenestene mine for utvikling og hosting av nettsider, samtykker du i å overholde de følgende vilkårene. Disse vilkårene utgjør en juridisk bindende avtale mellom deg og Alkymisten (en enkeltmannsforetak drevet av [ditt navn]). Hvis du ikke godtar disse vilkårene, bør du avstå fra å bruke tjenestene."
    },
    {
        header: "Tjenestebeskrivelse",
        body: "Alkymisten tilbyr omfattende tjenester innen utvikling og hosting av nettsider. Dette inkluderer, men er ikke begrenset til, design, programmering, implementering av funksjonaliteter, vedlikehold og hosting. Jeg bruker moderne teknologier og følger bransjestandarder for å sikre at nettsidene er sikre, pålitelige og brukervennlige. Alle tjenester leveres i henhold til spesifikasjonene avtalt med kunden."
    },
    {
        header: "Brukerens Ansvar",
        body: "Som kunde hos Alkymisten er du fullt ut ansvarlig for innholdet på din nettside. Dette inkluderer, men er ikke begrenset til, tekst, bilder, videoer, lydfiler, grafikk og annet materiale som du eller brukerne dine laster opp eller publiserer. Du bekrefter at alt innhold som publiseres på nettsiden din overholder gjeldende lover og forskrifter, inkludert, men ikke begrenset til, lover om opphavsrett, personvern, ærekrenkelse, diskriminering og ytringsfrihet.\n\nDu forplikter deg til å holde Alkymisten skadesløs for ethvert krav, tap, ansvar, kostnader og utgifter (inkludert advokatsalær) som følge av eller i forbindelse med innholdet på din nettside, inkludert krav fra tredjeparter. Du beholder fullt eierskap og ansvar for alt innhold på din nettside, og du gir Alkymisten nødvendige rettigheter til å bruke, kopiere, distribuere og vise innholdet i den grad det er nødvendig for å levere tjenestene."
    },
    {
        header: "Personvernerklæring",
        body: "Alkymisten er forpliktet til å beskytte ditt personvern og sikre at dine personopplysninger behandles på en lovlig, rettferdig og transparent måte. Jeg samler inn og behandler personopplysninger kun i den grad det er nødvendig for å levere tjenestene, inkludert navn, kontaktinformasjon, betalingsinformasjon og annen relevant informasjon.\n\nPersonopplysninger vil bli behandlet i samsvar med gjeldende personvernlovgivning, inkludert EUs personvernforordning (GDPR). Jeg vil iverksette passende tekniske og organisatoriske tiltak for å beskytte personopplysninger mot uautorisert tilgang, tap, ødeleggelse eller skade.\n\nDu har rett til å få innsyn i, korrigere, slette eller begrense behandlingen av dine personopplysninger, samt rett til dataportabilitet. For å utøve dine rettigheter, vennligst kontakt [din kontaktinformasjon]."
    },
    {
        header: "Betalingsvilkår",
        body: "Betaling for tjenester må skje i henhold til de spesifiserte betalingsbetingelsene avtalt mellom deg og Alkymisten. Alle fakturaer må betales innen 14 dager etter fakturadato. Ved forsinket betaling vil det påløpe renter i henhold til forsinkelsesrenteloven, og Alkymisten forbeholder seg retten til å suspendere eller avslutte tjenestene inntil full betaling er mottatt.\n\nSelgeren kan kreve betaling for tjenesten fra det tidspunkt den blir levert til kjøperen. Dersom kjøperen bruker kredittkort eller debetkort ved betaling, kan selgeren reservere beløpet på kortet ved bestilling. Kortet blir belastet samme dag som tjenesten leveres.\n\nVed betaling med faktura, blir fakturaen til kjøperen utstedt ved levering av tjenesten. Betalingsfristen fremgår av fakturaen og er på minimum 14 dager fra mottak. Kjøpere under 18 år kan ikke betale med etterfølgende faktura.\n\nHvis det oppstår betalingsproblemer, er det viktig at du tar kontakt så snart som mulig for å diskutere mulige løsninger. Manglende betaling kan også resultere i tilleggskostnader for inndrivelse av utestående beløp, inkludert, men ikke begrenset til, inkassosalær og rettslige omkostninger."
    },
    {
        header: "Angrerett",
        body: "Med mindre avtalen er unntatt fra angrerett, kan kjøperen angre kjøpet av tjenesten i henhold til angrerettloven. Kjøperen må gi Alkymisten melding om bruk av angreretten innen 14 dager fra fristen begynner å løpe. I fristen inkluderes alle kalenderdager. Dersom fristen ender på en lørdag, helligdag eller høytidsdag forlenges fristen til nærmeste virkedag.\n\nAngrefristen anses overholdt dersom melding er sendt før utløpet av fristen. Kjøper har bevisbyrden for at angreretten er blitt gjort gjeldende, og meldingen bør derfor skje skriftlig (angrerettskjema, e-post eller brev).\n\nAngrefristen begynner å løpe:\n\n- Ved kjøp av enkeltstående tjenester vil angrefristen løpe fra dagen etter tjenesten(e) er levert.\n- Selges et abonnement, eller innebærer avtalen regelmessig levering av identiske tjenester, løper fristen fra dagen etter første levering er mottatt.\n- Består kjøpet av flere leveranser, vil angrefristen løpe fra dagen etter siste levering er mottatt.\n\nAngrefristen utvides til 12 måneder etter utløpet av den opprinnelige fristen dersom selger ikke før avtaleinngåelsen opplyser om at det foreligger angrerett og standardisert angreskjema. Tilsvarende gjelder ved manglende opplysning om vilkår, tidsfrister og fremgangsmåte for å benytte angreretten. Sørger Alkymisten for å gi opplysningene i løpet av disse 12 månedene, utløper angrefristen likevel 14 dager etter den dagen kjøperen mottok opplysningene.\n\nVed bruk av angreretten må tjenesten avsluttes og eventuelle materialer returneres til Alkymisten uten unødig opphold og senest 14 dager fra melding om bruk av angreretten er gitt. Kjøper dekker de direkte kostnadene ved å returnere materialene, med mindre annet er avtalt eller Alkymisten har unnlatt å opplyse om at kjøper skal dekke returkostnadene. Alkymisten kan ikke fastsette gebyr for kjøperens bruk av angreretten.\n\nKjøper kan prøve eller teste tjenesten på en forsvarlig måte for å fastslå tjenestens art, egenskaper og funksjon, uten at angreretten faller bort. Dersom prøving eller test av tjenesten går utover hva som er forsvarlig og nødvendig, kan kjøperen bli ansvarlig for eventuell redusert verdi på tjenesten.\n\nAlkymisten er forpliktet til å tilbakebetale kjøpesummen til kjøperen uten unødig opphold, og senest 14 dager fra Alkymisten fikk melding om kjøperens beslutning om å benytte angreretten. Alkymisten har rett til å holde tilbake betalingen til tjenesten er avsluttet og eventuelle materialer er mottatt fra kjøperen, eller til kjøper har lagt frem dokumentasjon for at materialene er sendt tilbake."
    },
    {
        header: "Ansvarsfraskrivelse",
        body: "Tjenestene levert av Alkymisten leveres 'som de er', uten garantier av noe slag, enten uttrykkelige eller underforståtte. Alkymisten fraskriver seg alle garantier, inkludert, men ikke begrenset til, underforståtte garantier om salgbarhet, egnethet for et bestemt formål og ikke-krenkelse.\n\nAlkymisten er ikke ansvarlig for indirekte, tilfeldige, spesielle, følgeskader eller straffende skader, inkludert, men ikke begrenset til, tapt fortjeneste, tap av data eller annen økonomisk skade som oppstår som følge av eller i forbindelse med bruken av tjenestene, selv om Alkymisten er blitt informert om muligheten for slike skader."
    },
    {
        header: "Endringer i Vilkår",
        body: "Alkymisten forbeholder seg retten til å endre disse vilkårene når som helst. Eventuelle endringer vil bli publisert på min nettside, og det er ditt ansvar å gjennomgå disse vilkårene regelmessig. Fortsatt bruk av tjenestene etter slike endringer innebærer aksept av de reviderte vilkårene.\n\nHvis du ikke samtykker i de endrede vilkårene, må du slutte å bruke tjenestene og informere Alkymisten skriftlig om din avvisning av vilkårene."
    }
];

const TermsOfServiceList = () => (
    <Container>
        <List>
            {termsOfService.map((section, index) => (
                <React.Fragment key={index}>
                    <ListItem>
                        <ToSSection>
                            <Header variant="h6">{section.header}</Header>
                            <Body variant="body1">{section.body}</Body>
                        </ToSSection>
                    </ListItem>
                    {index < termsOfService.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </List>
    </Container>
);

export default TermsOfServiceList;
