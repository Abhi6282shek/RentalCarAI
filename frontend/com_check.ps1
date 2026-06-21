try {
    $html = New-Object -ComObject "HTMLFile"
    $c = Get-Content -Raw -Path "frontend/my-bookings.html"
    $html.write($c)
    Write-Host "Success loading HTML"
} catch {
    Write-Host "Error loading HTML: $_"
}
