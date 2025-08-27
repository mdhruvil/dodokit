# DodoKit

DodoKit is a lightweight boilerplate that makes it dead simple for developers to plug in payments to their app using Supabase and Dodo Payments.

## Features

- **Customer Creation**: Automatically creates a customer in Dodo Payments when a new user signs up in Supabase.
- **Webhook Handling**: Handles webhooks from Dodo Payments to keep subscription data in sync with Supabase.
- **Plug & Play Setup**: Reusable by changing API keys/config only.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Dodo Payments](https://dodopayments.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Supabase Account](https://supabase.com/)
- [Dodo Payments Account](https://dodopayments.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdhruvil/dodokit.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dodokit
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Create a `.env` file by copying the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

5. Populate the `.env` file with your Supabase and Dodo Payments API keys.

6. Set up Supabase:
   - Create a new project in Supabase.
   - Push the database migration to supabase follow [this guide](https://supabase.com/docs/guides/deployment/database-migrations#deploy-your-project). This migration will create `user_subscriptions` table with the necessary fields and RLS policies.
   - change the "Confirm Signup" and "Magic Link" templates in Supabase Auth settings to include the `{{.Token}}`
   ```html
   <h2>OTP</h2>
   <p>Your OTP for DodoKit</p>
   <h1>{{ .Token }}</h1>
   ```
7. Setup the webhooks. See this section [Webhooks](#webhooks)

### Running the Application

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

| Variable                                       | Description                                                                                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                     | The URL of your Supabase project.                                                                                    |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` | The publishable/anon key for your Supabase project.                                                                  |
| `SUPABASE_SERVICE_KEY`                         | The service key for your Supabase project. **WARNING**: never make this service key public, this key can bypass RLS. |
| `DODO_PAYMENTS_API_KEY`                        | The API key for your Dodo Payments account.                                                                          |
| `DODO_PAYMENTS_ENVIRONMENT`                    | The environment for your Dodo Payments account (e.g., `test_mode` or `live_mode`).                                   |
| `DODO_PAYMENTS_WEBHOOK_KEY`                    | The webhook key for your Dodo Payments account.                                                                      |
| `DODO_PAYMENTS_RETURN_URL`                     | The return URL for your Dodo Payments account.                                                                       |

## Webhooks

To test the webhook handling, you can use a tool like [ngrok](httpss://ngrok.com/) to expose your local development server to the internet.

1. Start the development server:

   ```bash
   bun dev
   ```

2. Expose your local server to the internet using ngrok:

   ```bash
   ngrok http 3000
   ```

3. In your Dodo Payments dashboard, set the webhook URL to the ngrok URL followed by `/api/webhook/dodo-payments` and copy the webhook secret from the webhook page and paste it in `.env`.

4. Trigger a test payment or subscription event in your Dodo Payments dashboard or from the application UI (i.e. `/dashboard` page).

5. You should see the webhook captured in your terminal and the Supabase tables updated accordingly.

## Assumptions and Trade-offs

- Since the boilerplate is made with Next.js, I have used its built-in API routes for handling webhooks and server-side logic.

## Time Spent

- I left my VSCode open when I went for lunch (unintentionally). That's why Wakatime is showing that I have spent 40 minutes in `.env` file. Click on badge to view full time spent filewise.

[![wakatime](https://wakatime.com/badge/user/018d823f-e19c-45bf-bce7-20ca9f2f3f55/project/453b14d2-3ec5-4921-9309-ac56063dfc2e.svg)](https://wakatime.com/@mdhruvil/projects/rildejbzhu)
