# Privacy Policy — Stock Scanner Pro

_Last updated: 2026-09-18_

Stock Scanner Pro is a single-page, client-side tool. It has no account
system, no first-party backend server, and no analytics or tracking code of
its own. Everything described below reflects what the app's own code
actually does — nothing more, nothing hidden.

## What is stored, and where

- **Locally, in your browser only**, using `localStorage`:
  - Your API keys (Finnhub, Twelve Data, FMP, Polygon, Alpha Vantage — for
    whichever providers you've chosen to enter)
  - Your scan settings (score mode, threshold, TTL, batch size, etc.)
  - Your scan progress / checkpoint data (screened tickers, scores, pass/fail
    state)
- None of the above is ever sent to any server operated by this app,
  because this app has no server. There is nothing to log in centrally,
  because nothing is centralized.
- Clearing your browser's site data for this page (or using "RESET ALL
  PROGRESS" in-app, plus clearing localStorage) removes all of it.

## What does leave your browser

To fetch live market data, this app makes outbound network requests
directly from your browser to:

- **Financial data providers**: Finnhub, Twelve Data, Financial Modeling
  Prep (FMP), Polygon, Alpha Vantage, Yahoo Finance, and Stooq.
- **Public CORS proxy services** (allorigins, corsproxy.io, codetabs.com,
  thingproxy) — used only where a data provider's own API doesn't allow
  direct browser requests. These proxies receive and relay the underlying
  request; the app has no control over what they do with the traffic they
  see, since they are independent third-party services, not part of this
  app.

**Important limitation, stated plainly rather than glossed over:** several
of these providers' free-tier APIs are designed to accept the API key as a
plain URL query parameter (`?apikey=...`) rather than a header. That is how
those providers built their public APIs — this app cannot change it while
using them. In practice this means your API key is visible in the request
URL to that provider (and, where a CORS proxy is used, to that proxy too).
This is a constraint of the underlying data services, not a design choice
of this app, and it isn't fixable from this app's code — see the app's own
engineering notes for confirmation.

Only the ticker symbol and standard market-data request parameters are sent
to these third parties — no name, email, or other personal identifier,
because the app never collects one.

## What this app does NOT do

- No account creation or login
- No first-party analytics, telemetry, or usage tracking
- No advertising or ad tracking
- No cookies used for tracking (only whatever a third-party provider/proxy
  sets on its own domain, outside this app's control)
- No server-side storage of your data anywhere — there is no server

## Your responsibility

Because API keys are stored in browser `localStorage` in plain text (a
standard browser-storage constraint, not encrypted at rest), treat this
page like any other place you'd keep a sensitive credential: don't use it
on a shared/public computer with your real API keys entered, and revoke/
rotate a key with its provider if you ever suspect it was exposed.

## Scope of this document

This is a plain-language description of actual app behavior for
transparency, written for an educational-use, single-user tool — it is not
a substitute for a lawyer-drafted privacy policy if this app is ever
distributed at scale or to a jurisdiction with specific legal disclosure
requirements.
