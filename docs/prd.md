# 📝 Product Requirements Document (PRD)

## 1. Produktübersicht

**Produktname:** FocusFlow  
**Ziel:** Eine moderne, minimalistische To-Do-App, die es Nutzern ermöglicht, Aufgaben zu erstellen, zu verwalten und zu organisieren – mit integriertem Login, Cloud-Speicherung und Premiumfunktionen.  
**Primäre Nutzer:**  
- Einzelpersonen, die eine einfache To-Do-Lösung mit cloudbasiertem Sync suchen  
- Power-User, die KI-gestützte To-Do-Vorschläge oder Textoptimierungen (via OpenAI) wünschen

---

## 2. Zielsetzung

**Hauptziele:**
1. Nutzer sollen sich registrieren, einloggen und ihre To-Dos speichern können.  
2. To-Dos sollen persistent in der Datenbank gespeichert sein (via Supabase).  
3. Zahlungssystem für Premium-Features über Stripe.  
4. Integration von OpenAI (z. B. zur automatischen Verbesserung oder Priorisierung).  
5. Saubere, responsive UI mit klarem Fokus auf Einfachheit.

---

## 3. Kernfunktionen

### a) Landing Page
**Zweck:** Besuchern erklären, was die App bietet, und sie zur Registrierung motivieren.  
**Inhalte:**
- Hero-Section: Kurze Beschreibung + Call-to-Action („Jetzt starten“)  
- Feature-Highlights (z. B. „Organisiere deine Aufgaben mit KI“)  
- Preise (Übersicht mit Stripe-Integration)  
- Footer mit Impressum/Datenschutz  

### b) Auth/Login (Supabase Auth)
**Zweck:** Geschützten Zugriff auf persönliche To-Dos gewährleisten.  
**Funktionen:**
- Login/Signup via Supabase Auth (E-Mail + Passwort)  
- Passwort-Wiederherstellung  
- Optional: Magic Link Login  
- Session-Handling im Frontend über Next.js Middleware  

### c) To-Do-Liste (geschützter Bereich)
**Zweck:** Hauptarbeitsbereich für eingeloggte Nutzer.  
**Funktionen:**
- **Liste anzeigen:** Alle To-Dos aus Supabase anzeigen.  
- **To-Do hinzufügen:** Mit TipTap Editor Text erstellen + speichern.  
- **Bearbeiten/Löschen:** CRUD-Operationen über Supabase.  
- **Optional:** Tagging, Prioritätssystem oder Fälligkeitsdatum.  
- **OpenAI-Integration:** Automatische Vorschläge für To-Do-Formulierungen oder Priorisierung.  

---

## 4. Tech Stack & Tools

| Komponente | Beschreibung |
|-------------|--------------|
| **Frontend** | Next.js 14 (App Router) |
| **Backend/BaaS** | Supabase (Auth, DB, APIs) |
| **Hosting** | Vercel |
| **Datenbank** | Supabase Postgres |
| **Zahlungssystem** | Stripe (Checkout Sessions, Webhooks) |
| **KI-Funktionen** | OpenAI API (Textoptimierung, Vorschläge) |
| **Editor** | TipTap (Rich Text Editing) |
| **Styling** | Tailwind CSS / ShadCN UI |
| **Deployment** | CI/CD mit Vercel Integration |

---

## 5. User Flow

1. **Landing Page:** Nutzer klickt auf „Jetzt starten“.  
2. **Registrierung/Login:** Nutzer meldet sich via Supabase Auth an.  
3. **Redirect zu To-Do-Liste:** Geschützter Bereich, nur authentifizierte Nutzer.  
4. **To-Dos erstellen/bearbeiten:** Nutzer interagiert mit TipTap Editor.  
5. **OpenAI Feature (optional):** Vorschläge erhalten oder Texte umformulieren.  
6. **Stripe (optional):** Nutzer kann Premium-Upgrade buchen.  

---

## 6. Datenstruktur (Supabase Beispiel)

**Tabelle:** `todos`

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Primärschlüssel |
| user_id | UUID | Verweis auf Supabase User |
| title | Text | Task-Titel |
| content | JSONB | TipTap Editor Content |
| created_at | Timestamp | Erstellungsdatum |
| updated_at | Timestamp | Änderungsdatum |

---

## 7. Anforderungen an das Design

- Minimalistisch, „clean productivity“ Stil  
- Klare Trennung öffentlicher (Landing) und privater Seiten (ToDo)  
- Responsives Layout für Desktop & Mobile  
- ShadCN UI / Tailwind CSS für schnelle Komponentenentwicklung  

---

## 8. Metriken / Success Criteria

- **MVP-Ziel:** Funktionierendes Login + CRUD auf To-Dos mit Supabase  
- **Engagement:** >70 % der Nutzer legen mind. 1 To-Do an  
- **Performance:** Seite lädt < 2s auf Desktop  
- **Conversion:** 5 % der Nutzer schließen Stripe-Checkout ab  

---

## 9. MVP Definition

Das MVP gilt als abgeschlossen, wenn Folgendes steht:
- Landing Page + Routing  
- Supabase Auth funktioniert  
- To-Do CRUD über UI + DB  
- TipTap Editor eingebunden  
- Deployment auf Vercel  
- Dokumentation im Repo vorhanden  

---

## 10. Erweiterungsideen (Roadmap)

- Dark Mode  
- Collaboration (geteilter Zugriff)  
- Mobile App (Next.js → PWA)  
- KI-Zusammenfassungen oder Tagesplan via OpenAI  
