<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js 15 App Router website. PostHog is initialised via `instrumentation-client.ts` (the correct approach for Next.js 15.3+) and all events are routed through a reverse proxy configured in `next.config.ts` to avoid ad-blocker interference.

## Files changed

| File | Change |
|------|--------|
| `instrumentation-client.ts` | **Created** — initialises PostHog client-side with EU host, exception capture, and debug mode in development |
| `next.config.ts` | **Updated** — added reverse proxy rewrites for `/ingest/*` and `skipTrailingSlashRedirect` |
| `.env.local` | **Updated** — added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `components/chatbot.tsx` | **Updated** — added `chatbot_opened`, `chatbot_closed`, `chatbot_message_sent` events; added `captureException` in the catch block |
| `app/cv/page.tsx` | **Updated** — added `cv_downloaded` event on the download button |
| `app/page.tsx` | **Updated** — added `strongme_link_clicked` event on home nav StrongME link |
| `app/work/page.tsx` | **Updated** — added `strongme_link_clicked` on work page StrongME links; `work_deep_link_clicked` on in-text CV, PhD, and publications links |
| `app/publications/page.tsx` | **Updated** — added `dblp_profile_clicked` on the DBLP external link |
| `app/PhD/page.tsx` | **Updated** — added `"use client"` directive and `phd_video_played` on video `onPlay` |
| `app/life/page.tsx` | **Updated** — added `"use client"` directive and `life_category_clicked` (with `category` property) on all 6 life section links |

## Events instrumented

| Event | Description | File(s) |
|-------|-------------|---------|
| `cv_downloaded` | User clicks the CV download button | `app/cv/page.tsx` |
| `chatbot_opened` | User opens the chatbot | `components/chatbot.tsx` |
| `chatbot_closed` | User closes the chatbot | `components/chatbot.tsx` |
| `chatbot_message_sent` | User sends a message; includes `message_length` property | `components/chatbot.tsx` |
| `strongme_link_clicked` | User clicks the external StrongME link; includes `source` property (`home` or `work`) | `app/page.tsx`, `app/work/page.tsx` |
| `dblp_profile_clicked` | User clicks the external DBLP research profile link | `app/publications/page.tsx` |
| `phd_video_played` | User plays the GuideGen PhD demo video | `app/PhD/page.tsx` |
| `life_category_clicked` | User navigates to a life section; includes `category` property (family, music, photography, gardening, friends, sport) | `app/life/page.tsx` |
| `work_deep_link_clicked` | User clicks an in-text deep link on the work page; includes `destination` property (cv, phd, publications) | `app/work/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behaviour, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/687110)
- [CV Downloads](/insights/1Lsjthe9) — tracks your most important conversion: visitors downloading your CV
- [Chatbot Engagement Funnel](/insights/McOcJQe3) — conversion from opening the chatbot to sending a message
- [External Link Clicks](/insights/pgi8Fsg2) — StrongME and DBLP link clicks over time
- [Life Section Interest](/insights/Qj3xzCGz) — which life categories visitors explore most, broken down by category
- [Work Content Deep Dives](/insights/4D5aUgrY) — which work content (CV, PhD, publications) drives the most engagement

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
