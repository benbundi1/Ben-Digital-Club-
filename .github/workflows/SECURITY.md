# Security Policy

## Reporting a vulnerability

If you discover a security issue in BenDigitalClub, please do not open a public issue. Instead, contact the maintainer privately and provide as much detail as possible about the issue, including the affected component, reproduction steps, and impact.

Please use the repository owner contact channel or a private GitHub security report if available.

## Supported versions

This project is in early bootstrap stage. Security fixes will be prioritized for the latest `main` branch.

## Best practices

- Never commit real secrets, API keys, database credentials, or production environment values.
- Use environment variables and secret management instead of `.env` files in source control.
- Validate and sanitize all user-submitted input.
- Keep dependencies updated and monitor GitHub security alerts.
