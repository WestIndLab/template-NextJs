# Shared Business Logic

This directory contains all shared business logic between the Next.js frontend and mobile application.

## Structure

```
shared/
├── domain/           # Business entities and interfaces
│   ├── entities/     # Core business objects
│   └── repositories/ # Repository interfaces
├── usecases/        # Application business rules
├── infrastructure/  # Implementation of repositories
└── utils/           # Shared utilities
```

## Usage

This shared logic can be imported in both the Next.js and mobile applications to ensure consistent business rules across platforms.
