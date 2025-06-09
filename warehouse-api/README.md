# Warehouse API

A RESTful API for warehouse management built with Express.js.

## Features

- Product management
- Authentication
- Swagger API documentation
- CORS enabled
- Ready for Vercel deployment

## Installation

```bash
npm install
```

## Development

To run the server locally:

```bash
npm start
```

The server will start on port 3000 (or the next available port).

- API documentation will be available at: `http://localhost:3000/api-docs`
- Health check endpoint: `http://localhost:3000/health`

## Deployment

### Prerequisites

1. Create a [GitHub](https://github.com) account
2. Create a [Vercel](https://vercel.com) account
3. Install [Git](https://git-scm.com)

### Steps to Deploy

1. Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub and push your code:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

3. Go to [Vercel](https://vercel.com)
4. Import your GitHub repository
5. Deploy! 