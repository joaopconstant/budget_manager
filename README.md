# Budget Manager

A personal finance dashboard built to demonstrate modern frontend architecture, clean state management, and real-world API integration.  
This project focuses on clarity, maintainability, and correct data flow rather than production-scale complexity.

---

## Overview

Budget Manager is a web application that allows users to track expenses, visualize spending by category, and filter data by date range.  
It was designed as a portfolio project to showcase solid frontend engineering practices, pragmatic technical decisions, and a clear separation of concerns.

The application uses Google OAuth for user identity, a lightweight external API for persistence, and a responsive dashboard built with reusable UI components.

---

## Key Features

- **Google OAuth Authentication**
  - User identity handled via Google OAuth.
  - Each user is associated with their own dataset using a unique identifier.

- **Interactive Dashboard**
  - Expense summary with total values.
  - Category-based aggregation.
  - Responsive pie chart visualization.

- **Date Range Filtering**
  - Global date range filter.
  - All dashboard components react automatically to the selected period.

- **CRUD Operations**
  - Add and remove budget entries.
  - Data updates are reflected immediately in the UI.

- **Cloud Data Persistence**
  - Budget data stored in Google Sheets.
  - Sheets exposed as a REST API using Sheets2API.

- **Responsive UI**
  - Mobile-first layout.
  - Consistent design system using shadcn/ui and Tailwind CSS.

---

## Technical Decisions and Rationale

This project prioritizes explicit architectural decisions and simplicity over unnecessary abstraction.

### TypeScript

TypeScript is used across the entire codebase to enforce type safety and predictable data handling.  
All domain entities and service responses are explicitly typed, reducing runtime errors and improving refactorability.

---

### Vite

Vite is used as the build tool and dev server to provide:

- Fast startup times
- Efficient Hot Module Replacement
- Optimized production builds

This improves developer experience without adding configuration overhead.

---

### shadcn/ui and Tailwind CSS

The UI layer is built with shadcn/ui components styled using Tailwind CSS.

This combination provides:

- Accessible components built on Radix UI primitives
- A consistent and scalable design system
- Minimal CSS overhead and predictable styling

UI components are treated strictly as presentation, with no business logic embedded.

---

### Google Sheets + Sheets2API

Google Sheets is used as a lightweight persistence layer, exposed via Sheets2API.

This decision demonstrates:

- Practical API integration skills
- Data normalization and transformation on the frontend
- A pragmatic approach for demos and internal tools

This is not intended as a production-ready backend, but as a clear and understandable data source for a portfolio project.

---

### Google OAuth

Google OAuth is used to handle user identity via a trusted external provider.

Important notes:

- OAuth is used for authentication, not for securing the data storage layer.
- The Sheets API remains publicly accessible for demo purposes.
- User identity is used to segment and filter data client-side.

This tradeoff is intentional and documented.

---

## Data Flow Overview

1. The user authenticates via Google OAuth.
2. A unique user identifier is extracted from the OAuth token.
3. Budget entries are associated with this user identifier.
4. Data is fetched from Google Sheets through Sheets2API.
5. The frontend filters, aggregates, and visualizes data based on user and date range.

All state derivation happens in the frontend, ensuring predictable data flow.

---

## Project Structure

The codebase follows a modular and scalable structure:

- `src/components`  
  Reusable UI components and feature-level components such as forms, tables, and charts.

- `src/services`  
  API interaction and external service logic.

- `src/hooks`  
  Custom hooks for user state and shared logic.

- `src/types`  
  Centralized domain and data model definitions.

- `src/lib`  
  Shared utilities and configuration helpers.

This separation keeps components focused and easy to reason about.

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

---

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

---

### Limitations

This project intentionally accepts the following limitations:

- Google Sheets is used as a public demo backend without row-level authorization.
- OAuth provides user identity but does not secure the storage layer.
- No server-side validation or access control is implemented.
- Not intended for storing real or sensitive financial data.

These tradeoffs are documented to maintain transparency and technical honesty.

---

### Future Improvements

- Edit existing budget entries
- Currency selection and formatting preferences
- Replace Sheets2API with a dedicated backend
- Role-based access control
- Persist user dashboard preferences

---

### This project is designed to demonstrate:

- Clean frontend architecture
- Correct state derivation
- Thoughtful technical tradeoffs
- Ability to integrate external services responsibly

It prioritizes clarity and correctness over unnecessary complexity.
