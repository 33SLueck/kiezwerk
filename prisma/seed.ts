import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma, InquiryStatus } from '../src/db';

const DEMO_NOTE = 'DEMO-DATENSATZ – fiktiv, kein echter Kundenfall.';

const main = async (): Promise<void> => {
  console.log('Seeding KiezWerk Berlin demo data...');

  await prisma.inquiryAttachment.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || 'demo.admin@kiezwerk.example';
  const adminPassword = process.env.ADMIN_PASSWORD || 'DemoAdmin123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: 'ADMIN', name: 'Demo Admin (KiezWerk)' },
    create: {
      email: adminEmail,
      name: 'Demo Admin (KiezWerk)',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const services = [
    {
      slug: 'reparaturen',
      title: 'Reparaturen',
      shortDescription: 'Schnelle Hilfe bei kleinen und mittleren Schäden im Wohnraum.',
      description: `${DEMO_NOTE} Reparaturen an Türen, Fenstern, Fliesen und Alltagsgegenständen – klar eingeschätzt und sauber erledigt.`,
      category: 'Reparatur',
      useCases: ['Defekte Türgriffe', 'Risse in Fliesen', 'Lose Leisten', 'Kleine Holzschäden'],
      processSteps: ['Kurzbeschreibung per Anfrage', 'Terminabstimmung', 'Ausführung vor Ort', 'kurze Übergabe'],
      faqItems: [
        { question: 'Wie schnell kommt ihr?', answer: 'Demo: In der Regel melden wir uns innerhalb eines Werktags zurück.' },
        { question: 'Bringt ihr Material mit?', answer: 'Demo: Kleinmaterial oft ja; größere Teile nach Absprache.' },
      ],
      imagePath: '/demo/service-repair.jpg',
      sortOrder: 1,
    },
    {
      slug: 'wartung',
      title: 'Wartung',
      shortDescription: 'Regelmäßige Checks, damit Anlagen und Ausstattung länger halten.',
      description: `${DEMO_NOTE} Wartungsrunden für Wohnungen und kleinere Gewerbeflächen – Checkliste statt Überraschung.`,
      category: 'Wartung',
      useCases: ['Saison-Check', 'Sichtkontrolle Armaturen', 'Nachjustieren von Beschlägen'],
      processSteps: ['Bedarf klären', 'Termin vor Ort', 'Protokoll der Checks', 'Empfehlungen'],
      faqItems: [{ question: 'Gibt es Wartungsverträge?', answer: 'Demo: Für das Showcase nicht vorgesehen; Anfrage genügt.' }],
      imagePath: '/demo/service-maintenance.jpg',
      sortOrder: 2,
    },
    {
      slug: 'renovierung',
      title: 'Renovierung',
      shortDescription: 'Räume auffrischen – Farbe, Böden, Details.',
      description: `${DEMO_NOTE} Renovierung in Etappen: vom einzelnen Zimmer bis zur abgestimmten Raumfolge.`,
      category: 'Renovierung',
      useCases: ['Streichen', 'Boden erneuern', 'Leisten und Anschlüsse'],
      processSteps: ['Besichtigung', 'Leistungsrahmen', 'Umsetzung', 'Abnahme'],
      faqItems: [{ question: 'Arbeiten wir bewohnt?', answer: 'Demo: Ja, mit Absprache zu Staubschutz und Zeiten.' }],
      imagePath: '/demo/project-renovation.jpg',
      sortOrder: 3,
    },
    {
      slug: 'badmodernisierung',
      title: 'Badmodernisierung',
      shortDescription: 'Bäder neu denken – von der Planung bis zur fertigen Fläche.',
      description: `${DEMO_NOTE} Badmodernisierung mit klaren Schritten: Zustand, Optionen, Terminplan, Ausführung.`,
      category: 'Bad',
      useCases: ['Dusche statt Wanne', 'Neue Fliesen', 'Armaturen und Möbel'],
      processSteps: ['Aufmaß', 'Varianten', 'Materialwahl', 'Umbau', 'Übergabe'],
      faqItems: [{ question: 'Wie lange dauert ein Bad?', answer: 'Demo: Stark abhängig vom Umfang; grobe Einschätzung nach Anfrage.' }],
      imagePath: '/demo/dokaryan-bathroom-3689922.jpg',
      sortOrder: 4,
    },
    {
      slug: 'innenausbau',
      title: 'Innenausbau',
      shortDescription: 'Wände, Einbauten und Raumaufteilung im Bestand.',
      description: `${DEMO_NOTE} Innenausbau für Trockenbau, Einbauschränke und Raumtrennung – abgestimmt auf Berliner Bestandswohnungen.`,
      category: 'Innenausbau',
      useCases: ['Trockenbau', 'Einbaumöbel', 'Nischen nutzen'],
      processSteps: ['Skizze', 'Material', 'Aufbau', 'Finish'],
      faqItems: [{ question: 'Genehmigungen?', answer: 'Demo: Tragende Eingriffe und Genehmigungen sind nicht Teil dieses Showcase.' }],
      imagePath: '/demo/service-interior.jpg',
      sortOrder: 5,
    },
    {
      slug: 'elektroarbeiten',
      title: 'Kleinere Elektroarbeiten',
      shortDescription: 'Steckdosen, Schalter, Leuchten – im üblichen Wohnungsrahmen.',
      description: `${DEMO_NOTE} Kleinere Elektroarbeiten ohne Anlagenplanung. Keine Behauptung zertifizierter Großanlagen.`,
      category: 'Elektro',
      useCases: ['Steckdose nachrüsten', 'Lampen montieren', 'Schalter tauschen'],
      processSteps: ['Bedarf', 'Sicherheitscheck', 'Montage', 'Funktionstest'],
      faqItems: [{ question: 'Netzanschluss / Zähler?', answer: 'Demo: Nicht im Leistungsumfang dieses Showcase.' }],
      imagePath: '/demo/service-electro.jpg',
      sortOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: { ...service, active: true } });
  }

  const projects = [
    {
      slug: 'badmodernisierung-berlin-demo',
      title: 'Badmodernisierung in Berlin (Demo)',
      category: 'Badmodernisierung',
      description: `${DEMO_NOTE} Beispielhafte Badmodernisierung mit neuer Dusche und hellen Flächen.`,
      locationLabel: 'Demo-Bezirk: Berlin (fiktiv)',
      imagePath: '/demo/dokaryan-bathroom-3689922.jpg',
      sortOrder: 1,
    },
    {
      slug: 'altbau-renovierung-demo',
      title: 'Altbau-Renovierung (Demo)',
      category: 'Renovierung',
      description: `${DEMO_NOTE} Raumweise Auffrischung in einem fiktiven Berliner Altbau.`,
      locationLabel: 'Demo-Bezirk: Berlin (fiktiv)',
      imagePath: '/demo/project-renovation.jpg',
      sortOrder: 2,
    },
    {
      slug: 'kuechenwand-innenausbau-demo',
      title: 'Küchenwand und Innenausbau (Demo)',
      category: 'Innenausbau',
      description: `${DEMO_NOTE} Einbau und Wandabschluss als Demo-Szenario für Innenausbau.`,
      locationLabel: 'Demo-Bezirk: Berlin (fiktiv)',
      imagePath: '/demo/project-interior.jpg',
      sortOrder: 3,
    },
    {
      slug: 'reparaturservice-kiez-demo',
      title: 'Reparaturservice im Kiez (Demo)',
      category: 'Reparaturen',
      description: `${DEMO_NOTE} Mehrere kleine Reparaturen in einer Demo-Wohnung.`,
      locationLabel: 'Demo-Bezirk: Berlin (fiktiv)',
      imagePath: '/demo/project-repair.jpg',
      sortOrder: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: { ...project, isDemo: true, active: true } });
  }

  const faqs = [
    {
      question: 'Ist KiezWerk Berlin ein echter Betrieb?',
      answer: 'Nein. Dies ist ein Demo-/Showcase-Projekt von Lück Digital. Inhalte und Anfragen sind fiktiv.',
      sortOrder: 1,
    },
    {
      question: 'Werden Anfragen wirklich bearbeitet?',
      answer: 'Anfragen werden nur lokal in der Demo-Datenbank gespeichert. Es erfolgt kein echter Auftrag.',
      sortOrder: 2,
    },
    {
      question: 'Wie läuft eine Anfrage ab?',
      answer: 'Über das mehrstufige Formular: Anliegen, Details, optionale Dateien, Kontakt, Prüfung – danach Demo-Referenznummer.',
      sortOrder: 3,
    },
    {
      question: 'Welche Dateien kann ich hochladen?',
      answer: 'JPG, PNG, WEBP und PDF bis zur konfigurierten Maximalgröße (Standard 5 MB).',
      sortOrder: 4,
    },
    {
      question: 'Gibt es feste Preise?',
      answer: 'Nein. Das Showcase zeigt den Anfrageprozess, keine verbindlichen Angebote.',
      sortOrder: 5,
    },
    {
      question: 'Sind die Projektbilder echte Kundenprojekte?',
      answer: 'Nein. Es sind gekennzeichnete Demo-Motive (Pexels-Stockfotos), keine Kundenreferenzen.',
      sortOrder: 6,
    },
  ];

  for (const faq of faqs) {
    await prisma.faq.create({ data: { ...faq, active: true } });
  }

  const inquirySeeds: Array<{
    referenceNumber: string;
    serviceType: string;
    description: string;
    desiredPeriod: string;
    budget: string;
    postalCode: string;
    name: string;
    email: string;
    phone?: string;
    status: InquiryStatus;
  }> = [
    {
      referenceNumber: 'KW-DEMO-1001',
      serviceType: 'Reparatur',
      description: 'Demo: Quietschende Zimmertür und loser Handlauf.',
      desiredPeriod: 'In den nächsten 2 Wochen',
      budget: 'unter 300 EUR',
      postalCode: '10115',
      name: 'Demo Nutzerin Anna',
      email: 'anna.demo@kiezwerk.example',
      phone: '+49 30 00000001',
      status: 'NEW',
    },
    {
      referenceNumber: 'KW-DEMO-1002',
      serviceType: 'Badmodernisierung',
      description: 'Demo: Dusche statt Wanne, neue Fliesen.',
      desiredPeriod: 'Q4 / flexibel',
      budget: '5000–10000 EUR',
      postalCode: '10999',
      name: 'Demo Nutzer Ben',
      email: 'ben.demo@kiezwerk.example',
      status: 'IN_REVIEW',
    },
    {
      referenceNumber: 'KW-DEMO-1003',
      serviceType: 'Renovierung',
      description: 'Demo: Zwei Zimmer streichen und Sockelleisten.',
      desiredPeriod: 'Nächster Monat',
      budget: '1000–2500 EUR',
      postalCode: '12043',
      name: 'Demo Nutzerin Carla',
      email: 'carla.demo@kiezwerk.example',
      phone: '+49 30 00000003',
      status: 'WAITING_FOR_CUSTOMER',
    },
    {
      referenceNumber: 'KW-DEMO-1004',
      serviceType: 'Innenausbau',
      description: 'Demo: Einbauschrank im Flur.',
      desiredPeriod: 'Nach Absprache',
      budget: 'noch offen',
      postalCode: '10437',
      name: 'Demo Nutzer Dana',
      email: 'dana.demo@kiezwerk.example',
      status: 'OFFER_PREPARED',
    },
    {
      referenceNumber: 'KW-DEMO-1005',
      serviceType: 'Wartung',
      description: 'Demo: Jährlicher Sichtcheck Armaturen und Beschläge.',
      desiredPeriod: 'Frühjahr',
      budget: 'unter 200 EUR',
      postalCode: '10785',
      name: 'Demo Nutzer Erik',
      email: 'erik.demo@kiezwerk.example',
      status: 'COMPLETED',
    },
  ];

  for (const inquiry of inquirySeeds) {
    await prisma.inquiry.create({
      data: {
        ...inquiry,
        consentGiven: true,
      },
    });
  }

  console.log('Seed complete (demo data only).');
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
