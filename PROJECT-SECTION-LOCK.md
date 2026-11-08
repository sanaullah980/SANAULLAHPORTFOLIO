# Private project section

The project collection is hidden by default and is rendered only after the server validates the password. A successful unlock creates a signed, HTTP-only, same-site cookie that expires after seven days. The project data is kept in a separate server-loaded module and is passed to the interactive project component only after access is granted.

## Password

The default password is `pakistan`. To change it, set `PROJECTS_PASSWORD` in your deployment environment. Do not add private values to client-side code.

## Vercel setup

In Vercel, open **Project → Settings → Environment Variables** and add:

- `PROJECTS_PASSWORD` = `pakistan`
- `PROJECTS_SESSION_SECRET` = a long, random secret (different from the password)

Apply them to Production (and Preview if needed), save, then redeploy. The app has a server-side fallback so the requested password works even before these variables are configured, but setting both variables is strongly recommended for production.

The lock protects the project section, not the rest of the portfolio.
