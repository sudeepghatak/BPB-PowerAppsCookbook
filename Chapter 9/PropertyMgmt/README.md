# PropertyMgmt

A Power Apps Code App built with React, TypeScript, and Vite. The app reads Power Apps host context and displays rows from configured Dataverse tables.

## Prerequisites

Before another developer can run this project successfully, they need all of the following:

- Node.js and npm installed.
- Access to the same Power Apps / Dataverse environment, or a compatible environment with equivalent generated tables and data sources.
- The generated Power Apps artifacts already in this repo under `src/generated` and `.power`, or the ability to regenerate them with the Power Apps CLI.
- A Power Apps runtime host for full functionality, because the app calls `getContext()` from `@microsoft/power-apps/app`.

## Install

```powershell
npm install
```

## Configure Dataverse Tables

The app no longer hardcodes the active table list in source. It reads a comma-separated environment variable named `VITE_DATAVERSE_TABLES`.

Supported logical names in the current repo are:

- `cr331_leases`
- `cr331_maintenancerequests`
- `cr331_properties`
- `cr331_tenants`

Create a local `.env` file in the project root if you want to choose a subset:

```env
VITE_DATAVERSE_TABLES=cr331_properties,cr331_tenants
```

If `VITE_DATAVERSE_TABLES` is not set, the app uses all supported tables generated in this repo.

## Run Locally

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

## Important Notes

- A plain local browser session may build and load the React app, but Dataverse access depends on the Power Apps host runtime and generated bindings.
- If another developer connects this project to a different environment, they may need to regenerate the Power Apps artifacts and update the supported service registry in `src/features/dataversePreview.ts`.
- The generated services and `.power` schema files are environment-specific integration assets, not generic reusable SDK code.
