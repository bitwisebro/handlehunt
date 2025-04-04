# HandleHunt

HandleHunt is a Next.js project designed to simplify social media handle discovery and management. It consists of two main services:

1. **HandleHunt**: A Next.js application for discovering and managing social media handles.
2. **Secret-Manager-Worker**: A Cloudflare Worker responsible for managing secret API tokens for HandleHunt, ensuring they are refreshed frequently.

## Features

- Search for available handles across multiple platforms.
- Save and manage your favorite handles.
- Securely manage API tokens with automatic refresh functionality.

## Installation

### HandleHunt

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/handlehunt.git
   ```
2. Navigate to the `handlehunt` directory:
   ```bash
   cd handlehunt
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

### Secret-Manager-Worker

1. Navigate to the `secret-manager-worker` directory:
   ```bash
   cd secret-manager-worker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy the worker to Cloudflare:
   ```bash
   wrangler publish
   ```

## Usage

1. Use the HandleHunt application to search for and manage social media handles.
2. The Secret-Manager-Worker will automatically handle API token management in the background.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
