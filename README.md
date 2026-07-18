# WhatsApp Cloud API Indicator Bot

A WhatsApp Cloud API bot for trading indicator vendors that auto-replies with indicator links from a JSON catalog and routes custom Pine Script development leads straight to your contact.

## Features

- Verifies and receives WhatsApp Cloud API webhooks (Meta Graph API v23.0).
- Keyword-based intent detection: greeting, indicator lookup, and developer-hire.
- Serves indicator links from an editable JSON catalog with keyword relevance scoring.
- Interactive quick-reply buttons (Indicator links / Hire Pine dev / Main menu).
- Routes custom Pine Script, strategy, and automation leads to your WhatsApp and call links.
- Fully configurable via environment variables (business name, assistant name, owner contact, catalog path).
- Zero database — stateless Express server backed by a flat JSON catalog file.
- Sends both plain text and interactive button messages back to the user.

## Stack

- Node.js (ES modules)
- Express 4
- dotenv
- WhatsApp Cloud API (Meta Graph API)

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Set `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `OWNER_PHONE_E164`.
3. Edit `data/indicator-catalog.json` to list your own indicators (title, url, description, keywords).
4. Run the server:
   ```bash
   npm run dev    # watch mode
   # or
   npm start
   ```
5. Expose the server (e.g. via a tunnel) and set the public `/webhook` URL plus your verify token in the Meta WhatsApp Cloud API dashboard.

## Configuration

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP port (default 3001) |
| `WHATSAPP_VERIFY_TOKEN` | Token used for webhook verification |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Cloud API access token |
| `WHATSAPP_PHONE_NUMBER_ID` | Cloud API phone number ID |
| `OWNER_PHONE_E164` | Your contact number in E.164 format |
| `OWNER_WHATSAPP_URL` / `OWNER_CALL_URL` | Optional overrides for lead-routing links |
| `BUSINESS_NAME` / `ASSISTANT_NAME` | Branding shown in replies |
| `DEFAULT_COUNTRY_HINT` | Default market hint in the welcome message |
| `CATALOG_PATH` | Path to the indicator catalog JSON |

## Notes

Trading automation is infrastructure, not financial advice. No profit guarantees. Test in dry-run/paper before live.

## Author

Built by [Jayadev Rana](https://jayadevrana.in) — @bluealgocapital · [YouTube](https://www.youtube.com/@jayadevrana3657) · [GitHub](https://github.com/jayadevrana)
