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

### Première mise en ligne (obligatoire, une seule fois)

1. Allez sur **Settings → Pages** du dépôt :
   https://github.com/bisounours1111/portfolio/settings/pages
2. Sous **Build and deployment → Source**, choisissez **Deploy from a branch**
3. **Branch** : `gh-pages` — dossier **`/ (root)`** — puis **Save**
4. Poussez sur `main` (ou relancez le workflow **Actions → Deploy to GitHub Pages → Run workflow**)

Le site sera disponible à : **https://bisounours1111.github.io/portfolio/**

### Déploiements suivants

Chaque push sur `main` rebuild et met à jour automatiquement la branche `gh-pages`.

> Le chemin de base (`/portfolio/`) est configuré dans `vite.config.js` lors du build CI (`GITHUB_PAGES=true`).

### Dépannage

| Erreur | Solution |
|--------|----------|
| `404` sur deploy-pages | Activez Pages avec la branche `gh-pages` (voir ci-dessus) |
| Site vide ou assets manquants | Vérifiez que le build CI utilise `GITHUB_PAGES=true` |
| Page 404 sur le site | Attendez 1–2 min après le déploiement, puis videz le cache |

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
