# 🏡 Γειτονικό

> Μην το πετάς. Κάποιος γείτονας το χρειάζεται.

Χάρτης με αντικείμενα που χαρίζονται σε **όλη την Αθήνα**. Ανώνυμα, χωρίς λογαριασμούς, χωρίς δικό μας server.

**Stack:** VitePress · Tailwind CSS v4 · Leaflet + OpenStreetMap · BootForm (φόρμες + δημόσιο feed) · Kit (newsletter) · GitHub Pages

## Τοπικά

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # docs/.vitepress/dist
```

## Ρυθμίσεις

Όλες οι ρυθμίσεις βρίσκονται στο [`docs/.vitepress/theme/lib/config.ts`](docs/.vitepress/theme/lib/config.ts).

| Ρύθμιση | Κατάσταση |
|---|---|
| `BOOTFORM.itemsFormId` | ✅ `ece2af40-…` |
| `BOOTFORM.feedReady` | ⏳ `false`: γίνεται `true` όταν η φόρμα περάσει σε **Pro** και ενεργοποιηθεί το Moderated Content Feed |
| `BOOTFORM.storiesFormId` | ⏳ placeholder |
| `BOOTFORM.honeypotField` | ⏳ επιβεβαίωση από το snippet του BootForm (τώρα `_gotcha`) |
| `KIT.formId` | ⏳ placeholder |
| `CONTACT_EMAIL` | ⏳ placeholder (και στο `docs/aporrito.md`) |
| Αποκομιδή ογκωδών ανά δήμο | ✅ `docs/pos-leitourgei.md` (επιβεβαίωση Πεντέλης & Κηφισιάς) |

Όσο κάτι είναι placeholder ή `feedReady: false`, το site δείχνει **demo δεδομένα** και το λέει με κίτρινη σημείωση.

## BootForm: πεδία φορμών

**Φόρμα «Αφήνω κάτι»**

| Πεδίο | Τύπος | Δημόσιο στο feed |
|---|---|---|
| `photo` | αρχείο (JPEG, ≤1600px, χωρίς EXIF) | ✅ |
| `title` | κείμενο | ✅ |
| `category` | `furniture` · `appliances` · `toys` · `clothes` · `books` · `home` · `sports` · `garden` · `other` | ✅ |
| `description` | κείμενο (προαιρετικό) | ✅ |
| `municipality` | κείμενο | ✅ |
| `lat`, `lng` | αριθμοί | ✅ |
| `available_from` | ISO ημερομηνία | ✅ |
| `available_until` | ISO ημερομηνία (προαιρετικό) | ✅ |

**Φόρμα «Ιστορίες»:** `photo`, `story`, `nickname` (προαιρετικό), `municipality`, `item_id` (προαιρετικό). Όλα δημόσια.

Ρυθμίσεις στο Workflow tab κάθε φόρμας:
- Moderated content feed: **on**
- Public fields: όλα τα παραπάνω
- Report threshold: **2** για τα αντικείμενα (το «🚫 Δεν υπάρχει πια τίποτα» χρησιμοποιεί το report), **3** για τις ιστορίες
- Allowed origins: `https://geitoniko.gr`, `https://<username>.github.io`, `http://localhost:5173`
- Ειδοποίηση για νέα υποβολή (Telegram ή email), για γρήγορη έγκριση

## Deploy στο GitHub Pages

1. Δημιούργησε repo (π.χ. `geitoniko`) και κάνε push στο `main`.
2. **Settings → Pages → Source: GitHub Actions.**
3. Το workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) χτίζει και ανεβάζει το site σε κάθε push.

### Custom domain `geitoniko.gr`

Στο DNS του registrar:

```
A      @     185.199.108.153
A      @     185.199.109.153
A      @     185.199.110.153
A      @     185.199.111.153
CNAME  www   <username>.github.io
```

Μετά: **Settings → Pages → Custom domain:** `geitoniko.gr` και **Enforce HTTPS**. Το base path προσαρμόζεται αυτόματα.

## Δομή

```
docs/
├── index.md              Χάρτης (αρχική)
├── afino.md              Αφήνω κάτι
├── istories.md           Ιστορίες + φόρμα
├── newsletter.md
├── pos-leitourgei.md     Οδηγίες, κανόνες, αποκομιδή
├── aporrito.md           Πολιτική απορρήτου (πρόχειρο)
└── .vitepress/
    ├── config.mts
    └── theme/
        ├── components/   ItemsMap, ItemForm, LocationPicker, PhotoInput,
        │                 StoriesFeed, StoryForm, NewsletterForm
        └── lib/          config, bootform (API + demo), status, image
```
