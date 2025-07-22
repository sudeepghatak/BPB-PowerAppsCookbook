Connect-PnPOnline -Url "https://sudeepghatakdemos.sharepoint.com/sites/AshishGhatak" -UseWebLogin
# Create the Suppliers list (if not already created)

New-PnPList -Title "Suppliers" -Template GenericList 

# Add a column to Suppliers (optional)
Add-PnPField -List "Suppliers" -DisplayName "ContactEmail" -InternalName "ContactEmail" -Type Text
