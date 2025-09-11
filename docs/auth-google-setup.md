# Google OAuth setup for NextAuth

Follow this checklist to fix "Access blocked: This app’s request is invalid".

1) Environment variables (.env.local)
- NEXTAUTH_URL=http://localhost:3000 (use your exact deployed origin in production)
- NEXTAUTH_SECRET=generate_a_strong_secret
- GOOGLE_CLIENT_ID=your_client_id
- GOOGLE_CLIENT_SECRET=your_client_secret

2) Google Cloud Console (APIs & Services → Credentials)
- Create OAuth 2.0 Client ID of type Web application.
- Authorized redirect URIs (must match exactly):
  - http://localhost:3000/api/auth/callback/google
  - https://your-domain.com/api/auth/callback/google (production)
- Authorized JavaScript origins:
  - http://localhost:3000
  - https://your-domain.com
- OAuth consent screen:
  - If Testing, add your email under Test users.
  - If In production, make sure app is published and required scopes are approved.

3) Restart the dev server after changing env vars
- Stop and re-run: npm run dev (or your command).

4) Verify
- Visit http://localhost:3000/api/auth/signin and click Google.
- If still blocked, re-check that the redirect URI in the error matches one of the authorized redirect URIs exactly (scheme, host, port, path).

Notes
- We enabled NextAuth debug logs; watch the server console for hints.
- If deploying behind a proxy or using preview URLs, either add those preview domains to Google or ensure NEXTAUTH_URL matches the current origin. We also enabled trustHost to help in such cases.
