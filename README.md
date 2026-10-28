# Power Apps Cookbook

This repository contains sample apps and supporting files for the Power Apps Cookbook. The examples are organized by the chapter and recipe numbers used in the book. They are intended to accompany the recipes, not to be a complete, ready-to-deploy production solution.

The sample apps, solutions, and scripts for this book are available in the book's GitHub repository. Because Power Platform evolves quickly, repository code may be updated after publication to reflect platform changes and improvements, so it may not match the listings in the book exactly. Where they differ, use the repository version.

## Repository contents

| Folder | Contents |
| --- | --- |
| `Chapter 1/` | Canvas app examples for recipes 4–8 |
| `Chapter 2/` | Canvas app examples for recipes 12–22 |
| `Chapter 3/` | Canvas app examples for recipes 24–28 and PowerShell scripts for setting up SharePoint lists |
| `Chapter 4/` | Canvas app example for recipe 30 |
| `Chapter 5/` | Canvas app example for recipes 39–40, a flow package, and a HarryPotterAPI OpenAPI definition |
| `Chapter 9/PropertyMgmt/` | Source code for a Power Apps code app built with React, TypeScript, and Vite |

Files with the `.msapp` extension are exported canvas app packages. ZIP files are separate packages and are not imported as `.msapp` files; use the import method appropriate to the package and recipe.

## Use a `.msapp` canvas app

A `.msapp` file is for a canvas app. It is not a solution ZIP and is not imported from the **Solutions** page.

### Import the app

1. Sign in to [Power Apps](https://make.powerapps.com/) and select the target environment.
2. Open **Apps** and choose **Import canvas app** (the exact menu placement may vary as the maker portal changes).
3. Browse to and upload the `.msapp` file from this repository.
4. Follow the prompts to create the app in the selected environment. If prompted to choose an import action, select whether to create a new app or update an existing one.
5. Resolve any requested connections, then open the app in Power Apps Studio.
6. Save and publish the app when you are ready to make it available to users.

### Edit and run the app

After import, open the app from **Apps** in the selected environment and choose **Edit** to open it in Power Apps Studio. Use **Play** in Studio to test it, or run the published app from Power Apps.

### Connections and environment-specific setup

An `.msapp` contains the canvas app, but it does not provision every resource the app may depend on. Depending on the recipe, you may need to:

- Reconnect data sources, such as SharePoint, Dataverse, or a connector.
- Have the referenced lists, tables, flows, and other resources already available in the environment.
- Update connection references, URLs, or other values to match your environment.
- Grant users access to the app and its underlying data sources.

The examples may use services or schemas that are specific to the original recipe environment. Review the app's data sources and formulas, and adapt them before use. Do not expect changes to a local `.msapp` file to update an app that has already been imported; import the updated file again to apply changes.

## Other files

### PowerShell scripts in Chapter 3

The scripts `01 - Suppliers.ps1`, `02 - Products.ps1`, and `03 - ShoppingCart.ps1` use PnP PowerShell to create SharePoint lists and columns used by the examples. Review each script before running it:

1. Install and configure the PnP PowerShell module for your environment.
2. Replace the sample SharePoint site URL in each script with a site you administer.
3. Sign in with an account that has permission to create lists and fields on that site.
4. Run the scripts in order, since Products depends on Suppliers and ShoppingCart depends on Products.

The scripts create resources in SharePoint; importing the canvas app does not run them automatically.

### Chapter 5 package and API definition

`Chapter 5/FlowGetBooks_20261028051310.zip` is a separate flow package associated with the recipe. Import it using the flow/package instructions in Power Automate and configure any connections it requires. `HarryPotterAPI.swagger.json` is the API definition used by the example; it is not an app or solution package.

### Chapter 9 code app

The `Chapter 9/PropertyMgmt/` folder contains a React/TypeScript Power Apps code app. Its own [README](Chapter%209/PropertyMgmt/README.md) describes prerequisites, configuration, and how to install dependencies, run, and build it. Full data access requires a compatible Power Apps host and Dataverse environment.

## Prerequisites

To work with these examples, you may need:

- A Power Apps account and access to a suitable environment.
- Permission to create or edit apps and access to their data sources.
- Any supporting SharePoint lists, Dataverse tables, flows, or connectors required by the specific recipe.
- For the Chapter 3 setup scripts, PowerShell with PnP PowerShell and suitable SharePoint permissions.
- For the Chapter 9 project, Node.js/npm and access to a compatible Power Apps and Dataverse environment.

Check the relevant recipe and app for resource-specific requirements before importing or running it.
