# Budget Manager

A personal finance management application designed for seamless budget tracking and data visualization. This project serves as a demonstration of modern frontend development practices, emphasizing clean architecture, type safety, and efficient data handling.

## Purpose

This application allows users to manage their personal finances by tracking income and expenses. It features a secure authentication flow, real-time data persistence, and a responsive dashboard that provides actionable insights into spending habits.

## Key Features

- **Secure Authentication**: Integrated Google OAuth for a seamless and secure user login experience.
- **Dynamic Dashboard**: Real-time data visualization of financial status, including total balance, income, and expenses.
- **Comprehensive CRUD Operations**: Fully functional interface for creating, reading, and deleting budget entries.
- **Cloud Persistence**: Leveraging Google Sheets as a easy and powerful, accessible backend for data storage.
- **Responsive Design**: A mobile-first approach ensuring a high-quality experience across all devices.

## Technical Decisions and Justification

The choice of technologies for this project was driven by the goal of creating a scalable, maintainable, and high-performance application.

### TypeScript

TypeScript was chosen as the primary language to ensure robust type safety across the application. By defining clear interfaces for data structures and service responses, the codebase remains predictable and easier to refactor, which is critical for long-term maintenance in professional environments.

### Vite

Vite is utilized as the build tool and development server. Its lightning-fast Hot Module Replacement (HMR) and optimized build process significantly improve developer productivity and application performance compared to traditional bundlers.

### Shadcn UI and Tailwind CSS

The UI is built using Shadcn UI components, styled with Tailwind CSS. This combination allows for:

- **Accessibility**: Shadcn components are built on top of Radix UI, ensuring high standards of accessibility (WAI-ARIA).
- **Customizability**: Tailwind CSS provides the flexibility to create a unique and premium aesthetic without the constraints of a rigid CSS-in-JS library.
- **Performance**: Tailwind's utility-first approach results in smaller CSS bundles and faster rendering.

### Sheets2API

Sheets2API is used to transform Google Sheets into a functional REST API. This decision demonstrates:

- **Resourcefulness**: Utilizing existing tools to create a backend solution without the overhead of managing a dedicated server or database for this specific use case.
- **API Integration**: Mastery of handling complex external API integrations, including proper error handling and data transformation.

### Google OAuth

Implementing Google OAuth via `@react-oauth/google` showcases proficiency in handling modern authentication protocols. It ensures that user identity is managed securely through a trusted provider, reducing the security risks associated with custom authentication systems.

## Project Structure

The project follows a modular architecture to separate concerns and improve readability:

- **src/components**: Organized into UI primitives and complex feature components (Dashboard, Forms).
- **src/services**: Encapsulates all API logic and authentication flows, keeping components lean and focused on presentation.
- **src/types**: Centralized type definitions to ensure consistency across the application.
- **src/lib**: Utility functions and shared configurations (e.g., Tailwind merge, API clients).

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/joaopconstant/budget_manager.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_SHEETS_API_URL=your_sheets2api_endpoint
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```

## TODO

- [ ] Add support for currency selection (USD, BRL, EUR, etc.)
- [ ] Add support for date formatting selection
- [ ] Add category input
