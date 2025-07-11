
# Talk to PDF - BackEnd

This is a minimal, end-to-end Retrieval-Augmented Generation (RAG) implementation that allows users to upload PDFs and chat with them.

This project serves as a barebones RAG architecture without relying on high-level AI SDKs or vector DB wrappers — ideal for understanding how RAG works under the hood.

### Features
- Parses uploaded PDFs and splits the content into overlapping chunks
- Generates vector embeddings for each chunk
- Stores embeddings in a PostgreSQL database
- When queried, retrieves the most relevant chunks via embedding similarity search
- Sends these chunks along with the user query to the LLM for a contextual response
- Streams the response back to the Frontend

### Libraries
- Docker - ankane/pgvector (image)
- Postgres
- Drizzle ORM

### LLM Services
- LLM: Groq.com ```llama3-8b-8192```
- Embedding: Gemini ```text-embedding-004```



## Installation

Clone repo

```bash
  git clone https://github.com/rohankshah/talktopdf-backend.git
  cd talktopdf-backend
```

Install packages

```bash
  npm run install
```

Spin up docker instance

```bash
  docker-compose up
```

Run server

```bash
  npm run dev
```

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL=postgresql://testuser:testpassword@localhost:1234/ttpdf-db`

`GEMINI_API_KEY`

`GROQ_API_KEY`
