$c = Get-Content -Path 'frontend/my-bookings.html'
1270..1300 | ForEach-Object {
    $idx = $_ - 1
    if ($idx -lt $c.Length) {
        $line = $c[$idx]
        Write-Host "Line $_ : $line"
        $chars = ""
        for ($j=0; $j -lt $line.Length; $j++) {
            $val = [int][char]$line[$j]
            $chars += "$val "
        }
        Write-Host "  Codes: $chars"
    }
}
