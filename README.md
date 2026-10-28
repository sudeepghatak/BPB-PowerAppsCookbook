# Power Apps Cookbook

This repository contains sample apps and supporting files for the Power Apps Cookbook. The examples are organized by chapter and recipe and are intended to accompany the book, not to be complete, ready-to-deploy production solutions.

The sample apps, solutions, and scripts for this book are available in the book's GitHub repository. Because Power Platform evolves quickly, repository code may be updated after publication to reflect platform changes and improvements, so it may not match the listings in the book exactly. Where they differ, use the repository version.

## Chapter guides

- [Chapter 1](Chapter%201/README.md)
- [Chapter 2](Chapter%202/README.md)
- [Chapter 3](Chapter%203/README.md)
- [Chapter 4](Chapter%204/README.md)
- [Chapter 5](Chapter%205/README.md)
- [Chapter 9](Chapter%209/README.md)

## Import and use a `.msapp` file

A `.msapp` file is an exported canvas app, not a solution ZIP. To import one:

1. Sign in to [Power Apps](https://make.powerapps.com/) and select the target environment.
2. From **Apps**, choose **Import canvas app** (the menu placement may change as the maker portal evolves).
3. Upload the `.msapp` file and follow the prompts to create a new app or update an existing one.
4. Resolve any requested connections, then open the app in Power Apps Studio.
5. Save and publish the app when it is ready for users.

After import, open the app from **Apps** and choose **Edit** to work on it in Studio. Use **Play** to test it, or run the published app from Power Apps.

The app package does not provision every resource it may depend on. Depending on the recipe, you may need to create or connect SharePoint lists, Dataverse tables, flows, or other services; update environment-specific values; and grant users access to the app and its data sources. Review each chapter guide and the recipe for requirements. Import an updated `.msapp` again to apply local file changes to the app in Power Apps.
