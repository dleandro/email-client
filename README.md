# Email Client

This is an email client application built with Remix, Tailwind CSS, and Prisma.

## Prerequisites

- Node.js (v20.16 or higher)
- PostgreSQL

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/email-client.git
   cd email-client
   ```
2. `npm install`
3. cp .env.example .env
4. execute your db instance with the connection url in your .env
5. `npx prisma generate`
6. `npx prisma migrate dev`

## Development
To start the development server with hot reloading, run:

1. `npm run dev`

## Running production build without docker
1. `npm run build`
2. `npm start`

## Recommended way to execute

### Prerequisites

- Docker
- Docker Compose

Just run `docker-compose up --build` and open your browser on `http://localhost:5173`