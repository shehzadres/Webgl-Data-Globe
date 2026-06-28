# Contributing

Thank you for your interest in contributing to Globe3D.

## Getting Started

1. Fork the repository.
2. Clone your fork.
3. Install dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm run dev
```

---

## Development Workflow

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Make your changes and verify:

```bash
npm run lint
npm run type-check
npm run build
```

Commit using descriptive messages:

```text
feat: add atmosphere shader
fix: improve route animation
docs: update architecture guide
refactor: optimize particle manager
```

Push your branch and open a Pull Request.

---

## Coding Standards

- Use TypeScript strict mode.
- Keep components focused and reusable.
- Prefer composition over duplication.
- Avoid unnecessary React re-renders.
- Keep rendering logic separate from UI logic.
- Maintain modular architecture.
- Document complex systems when appropriate.

---

## Pull Request Checklist

- [ ] Builds successfully
- [ ] Passes linting
- [ ] Passes type checking
- [ ] No console errors
- [ ] Documentation updated if required
- [ ] Screenshots added for UI changes

---

## Reporting Issues

Please include:

- Browser
- Operating System
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable

---

Thank you for helping improve Globe3D!