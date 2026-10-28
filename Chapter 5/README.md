# Chapter 5

This folder contains the canvas app and supporting files for recipes 39–40.

## Files

- `Recipe 39 and 40.msapp` — canvas app package.
- `FlowGetBooks_20261028051310.zip` — flow package associated with the example.
- `HarryPotterAPI.swagger.json` — API definition used by the example.

## Import the custom connector

Import the custom connector before importing the flow that uses it:

1. Sign in to [Power Apps](https://make.powerapps.com/) and select the target environment.
2. Open **More** (or **Discover all**) and find **Custom connectors**. The navigation labels may vary in the current maker portal.
3. Choose **New custom connector** > **Import an OpenAPI file**.
4. Enter a connector name, select `HarryPotterAPI.swagger.json`, and choose **Continue**.
5. Review the connector details and definition. Complete any required security or configuration fields, then create the connector.
6. Open the connector and use its **Test** page to create a connection and verify the API operations.

The Swagger/OpenAPI file defines the connector; it does not itself create a connection or import an app or flow. Review the recipe for any required authentication or API-specific configuration.

## Import the Power Automate flow

After creating the connector:

1. Open [Power Automate](https://make.powerautomate.com/) and select the same environment.
2. From **My flows**, choose **Import** and select the package import option. The precise menu wording and placement can vary.
3. Upload `FlowGetBooks_20261028051310.zip`.
4. In the import setup, create or select the required connections. For the custom connector connection, select the connector imported above and create or choose a connection for it.
5. Review the import actions and any flow-specific settings, then import the package.
6. Open the imported flow, check its connections and configuration, and turn it on when ready.

The ZIP is a Power Automate flow package, not a `.msapp` or necessarily a Dataverse solution ZIP. If the import wizard reports a missing connector or connection, confirm the connector was created in the same environment and that its connection has been set up.

## Import the canvas app

Import `Recipe 39 and 40.msapp` as described in the repository's [main README](../README.md). Reconnect its data sources and verify any references to the imported flow or custom connector in the target environment. Review the recipes for additional setup and external service requirements.
