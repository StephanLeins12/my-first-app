import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Color token definitions ────────────────────────────────────────────────

interface ColorSwatch {
  name: string;
  variable: string;
  description: string;
}

const semanticColors: ColorSwatch[] = [
  { name: "Background", variable: "--background", description: "Page background" },
  { name: "Foreground", variable: "--foreground", description: "Default text color" },
  { name: "Primary", variable: "--primary", description: "Primary actions & emphasis" },
  { name: "Primary Foreground", variable: "--primary-foreground", description: "Text on primary" },
  { name: "Secondary", variable: "--secondary", description: "Secondary surfaces" },
  { name: "Secondary Foreground", variable: "--secondary-foreground", description: "Text on secondary" },
  { name: "Muted", variable: "--muted", description: "Subtle backgrounds" },
  { name: "Muted Foreground", variable: "--muted-foreground", description: "Subdued text" },
  { name: "Accent", variable: "--accent", description: "Hover & highlight states" },
  { name: "Accent Foreground", variable: "--accent-foreground", description: "Text on accent" },
  { name: "Destructive", variable: "--destructive", description: "Errors & delete actions" },
  { name: "Border", variable: "--border", description: "Default border color" },
  { name: "Input", variable: "--input", description: "Input field border" },
  { name: "Ring", variable: "--ring", description: "Focus ring color" },
  { name: "Card", variable: "--card", description: "Card surface" },
  { name: "Card Foreground", variable: "--card-foreground", description: "Text on card" },
];

const chartColors: ColorSwatch[] = [
  { name: "Chart 1", variable: "--chart-1", description: "Orange" },
  { name: "Chart 2", variable: "--chart-2", description: "Teal" },
  { name: "Chart 3", variable: "--chart-3", description: "Blue" },
  { name: "Chart 4", variable: "--chart-4", description: "Yellow" },
  { name: "Chart 5", variable: "--chart-5", description: "Amber" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function Divider() {
  return <hr className="border-border my-12" />;
}

function ColorSwatchCard({ swatch }: { swatch: ColorSwatch }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-lg border border-border shadow-sm"
        style={{ backgroundColor: `var(${swatch.variable})` }}
      />
      <div>
        <p className="text-sm font-medium leading-none">{swatch.name}</p>
        <p className="text-muted-foreground mt-0.5 font-mono text-xs">{swatch.variable}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{swatch.description}</p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-4">

        {/* Header */}
        <div className="mb-12">
          <p className="text-muted-foreground mb-2 font-mono text-sm uppercase tracking-widest">
            Design System
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Style Guide</h1>
          <p className="text-muted-foreground mt-3 max-w-xl text-base">
            Alle visuellen Grundlagen der App auf einen Blick — Farben, Typographie,
            Abstände, Komponenten und mehr.
          </p>
        </div>

        <Divider />

        {/* ── Typography ── */}
        <section>
          <SectionHeading
            title="Typographie"
            subtitle="Geist (sans-serif) und Geist Mono — beide via next/font/google geladen."
          />

          <div className="space-y-8">
            {/* Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Schriftgrößen-Skala</CardTitle>
                <CardDescription>Tailwind v4 Standard-Skala</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "text-xs", size: "text-xs", sample: "12px — Hilfstexte, Badges" },
                  { label: "text-sm", size: "text-sm", sample: "14px — Labels, Beschreibungen" },
                  { label: "text-base", size: "text-base", sample: "16px — Fließtext" },
                  { label: "text-lg", size: "text-lg", sample: "18px — Einleitungstext" },
                  { label: "text-xl", size: "text-xl", sample: "20px — Abschnittstitel" },
                  { label: "text-2xl", size: "text-2xl", sample: "24px — Seitenüberschriften" },
                  { label: "text-3xl", size: "text-3xl", sample: "30px — Hero-Titel" },
                  { label: "text-4xl", size: "text-4xl", sample: "36px — Display" },
                ].map(({ label, size, sample }) => (
                  <div key={label} className="flex items-baseline gap-4">
                    <span className="text-muted-foreground w-20 shrink-0 font-mono text-xs">
                      {label}
                    </span>
                    <span className={`${size} font-sans leading-tight`}>{sample}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Font families */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Geist Sans</CardTitle>
                  <CardDescription className="font-mono text-xs">--font-geist-sans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-sans text-2xl font-light">Light 300</p>
                  <p className="font-sans text-2xl font-normal">Regular 400</p>
                  <p className="font-sans text-2xl font-medium">Medium 500</p>
                  <p className="font-sans text-2xl font-semibold">Semibold 600</p>
                  <p className="font-sans text-2xl font-bold">Bold 700</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Geist Mono</CardTitle>
                  <CardDescription className="font-mono text-xs">--font-geist-mono</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-mono text-2xl font-light">Light 300</p>
                  <p className="font-mono text-2xl font-normal">Regular 400</p>
                  <p className="font-mono text-2xl font-medium">Medium 500</p>
                  <p className="font-mono text-2xl font-semibold">Semibold 600</p>
                  <p className="font-mono text-2xl font-bold">Bold 700</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Colors ── */}
        <section>
          <SectionHeading
            title="Farbpalette"
            subtitle="Alle semantischen CSS-Variablen — Stone-Basis, oklch Farbraum, shadcn New York Style."
          />

          <div className="space-y-8">
            <div>
              <h3 className="text-muted-foreground mb-4 text-sm font-medium uppercase tracking-wider">
                Semantische Farben
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {semanticColors.map((swatch) => (
                  <ColorSwatchCard key={swatch.variable} swatch={swatch} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-4 text-sm font-medium uppercase tracking-wider">
                Chart-Farben
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {chartColors.map((swatch) => (
                  <ColorSwatchCard key={swatch.variable} swatch={swatch} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Border Radius ── */}
        <section>
          <SectionHeading
            title="Border Radius"
            subtitle="Basis: --radius = 0.625rem (10px). Alle Stufen sind davon abgeleitet."
          />
          <div className="flex flex-wrap items-end gap-6">
            {[
              { label: "sm", value: "calc(0.625rem - 4px)", cls: "rounded-sm" },
              { label: "md", value: "calc(0.625rem - 2px)", cls: "rounded-md" },
              { label: "lg", value: "0.625rem", cls: "rounded-lg" },
              { label: "xl", value: "calc(0.625rem + 4px)", cls: "rounded-xl" },
              { label: "2xl", value: "calc(0.625rem + 8px)", cls: "rounded-2xl" },
              { label: "3xl", value: "calc(0.625rem + 12px)", cls: "rounded-3xl" },
              { label: "full", value: "9999px", cls: "rounded-full" },
            ].map(({ label, value, cls }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`${cls} h-16 w-16 border-2 border-primary bg-muted`}
                />
                <span className="font-mono text-xs font-medium">{label}</span>
                <span className="text-muted-foreground font-mono text-xs">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Buttons ── */}
        <section>
          <SectionHeading
            title="Buttons"
            subtitle="6 Varianten × 4 Größen. Basis: shadcn/ui Button mit cva."
          />

          <div className="space-y-6">
            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium uppercase tracking-wider">
                Varianten
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium uppercase tracking-wider">
                Größen
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium uppercase tracking-wider">
                Zustände
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Form Elements ── */}
        <section>
          <SectionHeading
            title="Formular-Elemente"
            subtitle="Input, Label — die Bausteine aller Auth-Formulare."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Input-Zustände</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="normal">Normal</Label>
                  <Input id="normal" placeholder="Platzhaltertext…" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="filled">Ausgefüllt</Label>
                  <Input id="filled" defaultValue="max.mustermann@beispiel.de" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="disabled">Deaktiviert</Label>
                  <Input id="disabled" placeholder="Nicht editierbar" disabled />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="invalid">Fehler</Label>
                  <Input id="invalid" aria-invalid="true" defaultValue="ungültig" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Beispiel-Formular</CardTitle>
                <CardDescription>Wie es in der App aussieht</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email-demo">E-Mail</Label>
                  <Input id="email-demo" type="email" placeholder="name@beispiel.de" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pw-demo">Passwort</Label>
                  <Input id="pw-demo" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Anmelden</Button>
                <Button variant="outline" className="w-full">
                  Konto erstellen
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ── Cards ── */}
        <section>
          <SectionHeading
            title="Cards"
            subtitle="Anatomie einer shadcn Card: Header, Title, Description, Content, Footer."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Einfache Card</CardTitle>
                <CardDescription>Nur Header und Content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Inhalt der Card mit normalem Fließtext.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mit Aktion</CardTitle>
                <CardDescription>Header + Content + Button</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Kurze Beschreibung des Inhalts.
                </p>
                <Button size="sm" variant="outline">
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Fehler-Card</CardTitle>
                <CardDescription>Destructive Variante</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Etwas ist schiefgelaufen.
                </p>
                <Button size="sm" variant="destructive">
                  Erneut versuchen
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ── Shadows & Spacing ── */}
        <section>
          <SectionHeading
            title="Schatten"
            subtitle="Tailwind v4 Standard-Schatten-Skala."
          />
          <div className="flex flex-wrap items-end gap-6">
            {[
              { label: "shadow-xs", cls: "shadow-xs" },
              { label: "shadow-sm", cls: "shadow-sm" },
              { label: "shadow", cls: "shadow" },
              { label: "shadow-md", cls: "shadow-md" },
              { label: "shadow-lg", cls: "shadow-lg" },
              { label: "shadow-xl", cls: "shadow-xl" },
            ].map(({ label, cls }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div
                  className={`${cls} h-16 w-16 rounded-lg bg-card border border-border`}
                />
                <span className="font-mono text-xs">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-muted-foreground text-center text-xs">
            shadcn/ui · New York Style · Stone Base · Tailwind v4 · Geist Fonts
          </p>
        </div>
      </div>
    </main>
  );
}
