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

## Testing

### Firing Webhooks

To test the webhook handling, you can use a tool like [ngrok](httpss://ngrok.com/) to expose your local development server to the internet.

1. Start the development server:

   ```bash
   bun dev
   ```

2. Expose your local server to the internet using ngrok:

   ```bash
   ngrok http 3000
   ```

3. In your Dodo Payments dashboard, set the webhook URL to the ngrok URL followed by `/api/webhook/dodo-payments`.

4. Trigger a test payment or subscription event in your Dodo Payments dashboard.

5. You should see the webhook captured in your terminal and the Supabase tables updated accordingly.

## Assumptions and Trade-offs

- Since the boilerplate is made with Next.js, I have used its built-in API routes for handling webhooks and server-side logic.

## Time Spent

- I forgot to track the time spent on each feature :)
- But it was likely around 7 hours altogether.
