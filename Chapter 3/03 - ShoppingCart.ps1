# Connect first if not already
Connect-PnPOnline -Url "https://sudeepghatakdemos.sharepoint.com/sites/AshishGhatak" -UseWebLogin

# === Create ShoppingCart List ===
New-PnPList -Title "ShoppingCart" -Template GenericList

# === Get Products List ID for lookup ===
$productsList = Get-PnPList -Identity "Products"

# === Create Lookup to Products ===
$lookupXml = "<Field 
    Type='Lookup' 
    Name='Product' 
    StaticName='Product' 
    DisplayName='Product' 
    List='{$($productsList.Id)}' 
    ShowField='Title' 
    Required='TRUE' 
    Group='Custom Columns' />"

Add-PnPFieldFromXml -List "ShoppingCart" -FieldXml $lookupXml 

# === Add Supporting Fields ===
Add-PnPField -List "ShoppingCart" -DisplayName "Quantity" -InternalName "Quantity" -Type Number -AddToDefaultView
Add-PnPField -List "ShoppingCart" -DisplayName "Added By" -InternalName "AddedBy" -Type User -AddToDefaultView
Add-PnPField -List "ShoppingCart" -DisplayName "Date Added" -InternalName "DateAdded" -Type DateTime -AddToDefaultView
Add-PnPField -List "ShoppingCart" -DisplayName "PriceSnapshot" -InternalName "PriceSnapshot" -Type Number -AddToDefaultView
Add-PnPField -List "ShoppingCart" -DisplayName "DiscountSnapshot" -InternalName "DiscountSnapshot" -Type Number -AddToDefaultView
Add-PnPField -List "ShoppingCart" -DisplayName "FinalPrice" -InternalName "FinalPrice" -Type Number -AddToDefaultView

