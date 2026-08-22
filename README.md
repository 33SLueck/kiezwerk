# KiezWerk Berlin

Demo-/Showcase-MVP einer digitalen Anfrageplattform für einen **fiktiven** Berliner Handwerksbetrieb. Technisches Showcase von **Lück Digital** – Inhalte und Anfragen sind fiktiv.

> Demo-Banner im Frontend: „Demo-Projekt von Lück Digital – Inhalte und Anfragen sind fiktiv.“

## Zweck

Professionelles Referenzprojekt für Lück Digital: öffentliche Unternehmenswebsite, Leistungsseiten, Projektgalerie, FAQ, mehrstufiges Anfrageformular, lokale PostgreSQL-Speicherung und einfaches Admin-Dashboard – lauffähig mit Docker auf dem eigenen Rechner.

## Architektur

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + wiederverwendete UI-Patterns aus dem BaseWebRepo-Eject
- **PostgreSQL 16** + **Prisma 7**
- **Route Handlers** unter `/api/*` (öffentlich) und `/api/admin/*`
- **NextAuth** (Credentials) für `/admin` und `/api/admin`; Standard `REQUIRE_ADMIN_AUTH=true`
- Uploads nur lokal im Volume `uploads_data`
- Erzeugt aus `basewebrepo` via `node eject.js business --with-admin ../kiezwerk-berlin`

Content (Leistungen, Projekte, FAQs) liegt in Prisma und ist über `src/lib/content` gekapselt, damit später ein CMS andocken kann – **ohne Strapi** in diesem MVP.

## Voraussetzungen

- Docker + Docker Compose
- optional lokal: Node.js 22+, pnpm 11+

## Schnellstart (Docker)

```bash
cp .env.example .env
docker compose up --build
```

Danach:

- Website: http://localhost:3000
- Admin-Login: http://localhost:3000/admin/login
  - Demo: `demo.admin@kiezwerk.example` / `DemoAdmin123!`

Beim Start führt der Container `prisma db push` und den Demo-Seed aus (`RUN_DB_SEED=true`).

## Lokale Entwicklung (Host)

```bash
cp .env.example .env
docker compose up -d postgres
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

## Wichtige URLs

| URL | Beschreibung |
|-----|--------------|
| `/` | Startseite |
| `/leistungen` | Leistungsübersicht |
| `/leistungen/[slug]` | Leistungsdetail |
| `/projekte` | Demo-Projektgalerie (+ Kategoriefilter) |
| `/faq` | FAQ |
| `/anfrage` | Mehrstufiges Anfrageformular |
| `/kontakt` | Demo-Kontaktdaten |
| `/impressum`, `/datenschutz` | Rechtliche Demo-Platzhalter |
| `/admin/login` | Admin-Anmeldung (Credentials) |
| `/admin` | Dashboard (geschützt) |
| `/admin/anfragen` | Anfragenliste (geschützt) |
| `/admin/anfragen/[id]` | Anfragedetail + Status (geschützt) |

## Umgebungsvariablen

Siehe [`.env.example`](.env.example). Wichtige Keys:

- `DATABASE_URL` / `DATABASE_URL_DOCKER`
- `UPLOAD_DIR`, `MAX_UPLOAD_BYTES`
- `REQUIRE_ADMIN_AUTH`, `AUTH_SECRET`, `NEXTAUTH_URL`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (nur Demo, Seed)

## Test- und Build-Befehle

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Upload-Konzept

- Erlaubt: JPG, PNG, WEBP, PDF
- Serverseitige Prüfung von MIME, Endung und Größe
- Dateinamen werden sanitisiert und mit Zufallsprefix gespeichert
- Speicherung nur unter `UPLOAD_DIR` (Docker-Volume `uploads_data`)
- Keine Speicherung außerhalb des Volumes

## Bilder (Pexels)

Unter `public/demo/` liegen lokal heruntergeladene **Pexels**-Stockfotos (Pexels License). Sie sind in der UI als Demo-Bilder/Demo-Projekte gekennzeichnet und stellen **keine** realen Kundenprojekte dar.

Quellen (Photo-IDs): 5691608, 1454806, 6474471, 2724749, 5691622, 1249611, 6585757, 1643383, 8961065, 257736 – siehe [pexels.com](https://www.pexels.com/).

## Demo-Hinweise

- Keine echten personenbezogenen Daten verwenden
- Demo-Admin: siehe `.env.example` (`demo.admin@kiezwerk.example` / `DemoAdmin123!`)
- Indexierung ist per `robots.txt` und `noindex` unterbunden (Showcase)

## SEO-Entscheidung

Die Demo-Installation setzt bewusst `Disallow: /` und Meta-`noindex`, damit Suchmaschinen den fiktiven Betrieb nicht als echtes Unternehmen indexieren.

## Barrierearmut

Die Demo ist auf semantisches HTML, Tastaturbedienung, sichtbare Fokuszustände, Labels und `aria-live` für Formularstatus ausgelegt. Es wird **nicht** behauptet, dass die Anwendung BFSG-konform ist.

## Nicht für Produktion

Vor einem echten Einsatz wären unter anderem erforderlich:

- Stärkere Authentifizierung (kein Demo-Passwort, kein festes Seed-Konto)
- Datenschutzprüfung
- rechtliche Texte
- sichere E-Mail-Zustellung
- Rate Limiting
- CSRF-/Origin-Schutz über Auth.js hinaus
- Malware-Prüfung für Uploads
- Backup-Konzept
- Monitoring
- feinere Rollen- und Rechteverwaltung
- sichere Lösch- und Aufbewahrungsfristen

Diese Anwendung ist **nicht** rechtlich vollständig compliant. Der Adminbereich ist mit NextAuth Credentials und `proxy.ts` abgesichert, aber **nicht** produktionssicher (Demo-Secrets, kein Rate Limiting).

## Annahmen

1. Eject nach `../kiezwerk-berlin` ohne CMS/Redis/Sentry
2. Prisma `db push` statt Migrationshistorie (wie im BaseWebRepo)
3. Validierung mit eigener Validierungsschicht (kein zusätzliches Zod)
4. Stockbilder von Pexels, lokal abgelegt
5. Kein Mailversand; optionale spätere Mailpit-Integration nur dokumentiert

## Mögliche Ausbaustufen (v2)

- OAuth / Passkeys, Session-Revocation
- CMS-Anbindung über die Content-Schicht
- Mailpit / Transaktionsmails
- Rate Limiting / Redis
- Datei-Preview im Admin
- Mehrsprachigkeit

## Herkunft

Eigenständiges Projekt, ejected aus dem internen `basewebrepo`. Das ursprüngliche Monorepo wurde dabei nicht destruktiv verändert.
