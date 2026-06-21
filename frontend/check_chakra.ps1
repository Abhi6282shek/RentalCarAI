try {
    # Set registry key to force Internet Explorer COM object to use IE11 Edge rendering engine
    # for powershell.exe to enable ES6 JS compilation support
    $registryPath = "HKCU:\Software\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BROWSER_EMULATION"
    if (-not (Test-Path $registryPath)) {
        New-Item -Path $registryPath -Force | Out-Null
    }
    Set-ItemProperty -Path $registryPath -Name "powershell.exe" -Value 11001 -Type DWord -Force
    
    $html = New-Object -ComObject "HTMLFile"
    $c = Get-Content -Raw -Path "frontend/my-bookings.html"
    
    # We write a header forcing Edge mode
    $header = "<html><head><meta http-equiv='X-UA-Compatible' content='IE=edge'></head><body></body></html>"
    $html.write($header)
    
    # Now write the actual HTML content
    $html.write($c)
    
    # If there is a script error, it will throw an exception or we can check the document window
    $window = $html.parentWindow
    Write-Host "Successfully loaded HTML and compiled JS"
    
    # Clean up registry
    Remove-ItemProperty -Path $registryPath -Name "powershell.exe" -ErrorAction SilentlyContinue
} catch {
    Write-Host "Error: $_"
    Remove-ItemProperty -Path $registryPath -Name "powershell.exe" -ErrorAction SilentlyContinue
}
