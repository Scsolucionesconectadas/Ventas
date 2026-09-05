# Comandos Runbook

## Servidor local

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:4173/index.html
```

## Validaciones

```bash
node --check assets/js/app.js
node --check assets/js/motion.js
node --check assets/js/medical-demo.js
node --check assets/js/industry-demo-data.js
node --check assets/js/industry-demo.js
git diff --check
```

## GitHub Pages

```bash
git status --short
git add .
git commit -m "feat: landing sc y demos por rubro"
git push origin main
```

Configuración en GitHub:

```text
Settings > Pages > Build and deployment > Source: Deploy from a branch
Branch: main
Folder: / (root)
```

URL prevista:

```text
https://maicolandresb123.github.io/Mokups_Ventas/
```
