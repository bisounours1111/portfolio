# Portfolio — Yanis DAÏ

Portfolio personnel développé avec **React** et **Vite**, déployable automatiquement sur **GitHub Pages**.

## Stack

- React 19
- Vite 8
- i18n FR / EN
- CSS custom (design sombre, animations scroll)

## Développement local

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:5173](http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement GitHub Pages

Le déploiement est automatisé via GitHub Actions (`.github/workflows/deploy.yml`).

1. Dans les **Settings** du dépôt GitHub → **Pages** → Source : **GitHub Actions**
2. Poussez sur la branche `main` — le workflow build et déploie automatiquement
3. Le site sera disponible à : `https://<username>.github.io/portfolio/`

> Le chemin de base (`/portfolio/`) est configuré dans `vite.config.js` lors du build CI (`GITHUB_PAGES=true`).

## Structure

```
src/
  components/     # Composants React (Header, Hero, Skills, etc.)
  pages/          # Page d'accueil
  i18n/           # Traductions FR / EN
  data/           # Données du profil
  hooks/          # Hooks personnalisés (scroll reveal)
  assets/         # Styles globaux
public/           # Assets statiques (images, CV, favicon)
```

## Personnalisation

- **Profil** : `src/data/portfolio.js`
- **Traductions** : `src/i18n/locales/fr.js` et `en.js`
- **Styles globaux** : `src/assets/main.css`

## Formulaire de contact

Le formulaire appelle `/api/contact` (backend séparé requis). Sur GitHub Pages (hébergement statique), utilisez l'e-mail direct ou branchez un service externe (Formspree, Resend, etc.).
