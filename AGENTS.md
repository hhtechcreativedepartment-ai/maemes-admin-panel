# Maeme's Admin Panel Instructions

## Project Scope

This repository is a frontend-only prototype for the Maeme's Admin Management Control Panel.

The existing Maeme's customer website will be analysed as a read-only reference.

## Mandatory Workflow

- Analyse the complete customer website before implementing the admin panel.
- Work only on the feature/admin-control-panel branch.
- Never modify backup/initial-admin-panel.
- Do not install packages before completing the analysis.
- Run lint and production build after implementation.

## Frontend-Only Requirements

- Do not create APIs.
- Do not create a database.
- Do not integrate real authentication.
- Do not integrate real payment processing.
- Use typed mock data, mock services and localStorage where appropriate.
- Keep mock services separate from UI components.
- Prepare the architecture for future API integration.

## Design System

- Primary red: #99041E
- Primary yellow: #FFC257
- Use white and soft neutral surfaces.
- Do not use black as the dominant interface colour.
- Keep the interface premium, professional, minimalistic and operational.
- Use consistent spacing, typography and components.
- Avoid excessive gradients, heavy shadows and overcrowded layouts.

## Code Quality

- Use TypeScript strict mode.
- Use reusable components.
- Use feature-based folders.
- Avoid monolithic components.
- Avoid duplicated mock data and types.
- Never collect or store real card details or sensitive customer information.<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
