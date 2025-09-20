# ECU Inspection Protocol (Next.js)

Dieses Projekt ist eine Next.js-App mit einem bearbeitbaren **Steuergerät‑Diagnose‑Protokoll**.
Du kannst Daten direkt im Browser eintragen und über die integrierten Buttons als **PDF** oder **Word** exportieren.

## Schnellstart (Lokal)

1. **Node.js 18+** installieren (empfohlen) und **pnpm**:
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```
2. Abhängigkeiten installieren und Dev‑Server starten:
   ```bash
   pnpm install
   pnpm dev
   ```
3. Browser öffnen: `http://localhost:3000`

## Auf GitHub hochladen

### Variante A – GitHub Desktop (einfach)
1. Neues Repository in GitHub anlegen (z. B. `ecu-inspection-protocol`).
2. Ordner dieses Projekts in GitHub Desktop öffnen (**Add an existing repository**).
3. **Commit** erstellen und **Publish repository** klicken.

### Variante B – Git (Kommandozeile)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<DEIN-USERNAME>/ecu-inspection-protocol.git
git push -u origin main
```

> **Tipp:** Drücke auf GitHub im Repository die Taste `.` um den Web‑Editor zu öffnen und Dateien online zu bearbeiten.

## Deployment (Drucken & Export online)

Am einfachsten mit **Vercel** (kostenloser Hobby‑Plan):

1. Auf vercel.com anmelden und **New Project** → **Import Git Repository**.
2. Dein GitHub‑Repo auswählen, Framework „**Next.js**“ wird automatisch erkannt.
3. **Deploy** klicken. Nach ~1 Minute bekommst du eine URL wie `https://dein-projekt.vercel.app`.
4. Öffne die URL → Button **Export PDF** oder **Export Word** nutzen. Alternativ kannst du im Browser `Strg+P`/`Cmd+P` drucken.

## Bearbeiten

Die wichtigsten Dateien:
- `components/editable-protocol.tsx` – Formular/Logik des Protokolls (inkl. **Export als PDF/Word**)
- `app/page.tsx` – Einstieg der Seite
- `styles/globals.css` – globale Styles

## Optional: Druck-Optimierungen
Wenn du zusätzlich einen „Drucken“-Button möchtest, kannst du in `app/page.tsx` so etwas ergänzen:

```tsx
"use client"
import { EditableProtocol } from "@/components/editable-protocol"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="print:hidden p-4">
        <button onClick={() => window.print()}>Drucken</button>
      </div>
      <EditableProtocol />
    </main>
  )
}
```

Und in `styles/globals.css` am Ende:
```css
@media print {
  .print\:hidden { display: none !important; }
  body { background: white; }
}
```

---
*Stand: 2025-09-20*
