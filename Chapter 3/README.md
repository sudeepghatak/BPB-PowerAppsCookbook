# Chapter 3

This folder contains canvas app examples for recipes 24–28 and PowerShell scripts for creating SharePoint lists used by the examples.

## Files

- `Recipe 24.msapp`
- `Recipe 25 to 28.msapp`
- `01 - Suppliers.ps1` — creates the Suppliers list.
- `02 - Products.ps1` — creates the Products list and its fields, including a lookup to Suppliers.
- `03 - ShoppingCart.ps1` — creates the ShoppingCart list and a lookup to Products.

## Set up the SharePoint lists

The scripts use PnP PowerShell and create resources in SharePoint; importing an app does not run them. Before running any script:

1. Review the script contents and replace the site URL with a SharePoint site you administer.
2. Install and configure PnP PowerShell for your environment.
3. Connect with an account that has permission to create lists and fields on that site.
4. Run the scripts in order: Suppliers, Products, then ShoppingCart.

Import the canvas app packages into Power Apps following the [main README](../README.md), then connect them to the SharePoint resources created in your environment. Check the recipes for any additional configuration.
