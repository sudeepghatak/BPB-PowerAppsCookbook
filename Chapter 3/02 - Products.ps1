# Connect to SharePoint
Connect-PnPOnline -Url "https://sudeepghatakdemos.sharepoint.com/sites/AshishGhatak" -UseWebLogin


# Create Products list
New-PnPList -Title "Products" -Template GenericList 

# Add columns
Add-PnPField -List "Products" -DisplayName "Description" -InternalName "Description" -Type Note -AddToDefaultView
Add-PnPField -List "Products" -DisplayName "Price" -InternalName "Price" -Type Number -AddToDefaultView
Add-PnPField -List "Products" -DisplayName "SKU" -InternalName "SKU" -Type Text -AddToDefaultView
Add-PnPField -List "Products" -DisplayName "In Stock" -InternalName "InStock" -Type Boolean -AddToDefaultView
Add-PnPField -List "Products" -DisplayName "Quantity Available" -InternalName "Quantity" -Type Number -AddToDefaultView

# Category - Choice
Add-PnPField -List "Products" -DisplayName "Category" -InternalName "Category" -Type Choice `
    -Choices @("Accessories", "Electronics", "Clothing", "Home", "Other") -AddToDefaultView

# Tags - Multi-choice
Add-PnPField -List "Products" -DisplayName "Tags" -InternalName "Tags" -Type MultiChoice `
    -Choices @("Wireless", "Bluetooth", "USB", "Rechargeable", "Ergonomic") -AddToDefaultView

# Image - Hyperlink
Add-PnPField -List "Products" -DisplayName "ProductImage" -InternalName "ProductImage" -Type URL -AddToDefaultView

# Launch Date
Add-PnPField -List "Products" -DisplayName "LaunchDate" -InternalName "LaunchDate" -Type DateTime -AddToDefaultView

# Discount
Add-PnPField -List "Products" -DisplayName "Discount" -InternalName "Discount" -Type Number -AddToDefaultView

# Rating
Add-PnPField -List "Products" -DisplayName "Rating" -InternalName "Rating" -Type Number -AddToDefaultView

# Product Manager
Add-PnPField -List "Products" -DisplayName "Product Manager" -InternalName "ProductManager" -Type User -AddToDefaultView

$suppliersList = Get-PnPList -Identity "Suppliers"
# Related Products - Lookup to same list (multi)
$lookupFieldXml = "<Field 
    Type='Lookup' 
    Name='Supplier' 
    StaticName='Supplier' 
    DisplayName='Supplier' 
    List='{$($suppliersList.Id)}' 
    ShowField='Title' 
    Required='FALSE' 
    Group='Custom Columns' />"

Add-PnPFieldFromXml -List "Products" -FieldXml $lookupFieldXml 
