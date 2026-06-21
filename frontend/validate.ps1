$c = Get-Content -Raw -Path 'frontend/my-bookings.html'
$match = [regex]::Match($c, '<script>([\s\S]*?)</script>')
if ($match.Success) {
    $js = $match.Groups[1].Value
    $braces = 0
    $brackets = 0
    $parens = 0
    $inSingle = $false
    $inDouble = $false
    $inTemplate = $false
    
    # Simple line counter helper
    function Get-LineNumber($index) {
        return ($js.Substring(0, $index) -split "`n").Length
    }
    
    for ($i=0; $i -lt $js.Length; $i++) {
        $char = $js[$i]
        
        # Handle string literals to avoid counting braces inside strings
        if ($inTemplate) {
            if ($char -eq '`' -and $js[$i-1] -ne '\') {
                $inTemplate = $false
            }
        } elseif ($inSingle) {
            if ($char -eq "'" -and $js[$i-1] -ne '\') {
                $inSingle = $false
            }
        } elseif ($inDouble) {
            if ($char -eq '"' -and $js[$i-1] -ne '\') {
                $inDouble = $false
            }
        } else {
            if ($char -eq '`') {
                $inTemplate = $true
            } elseif ($char -eq "'") {
                $inSingle = $true
            } elseif ($char -eq '"') {
                $inDouble = $true
            } elseif ($char -eq '{') {
                $braces++
            } elseif ($char -eq '}') {
                $braces--
                if ($braces -lt 0) {
                    $line = Get-LineNumber $i
                    Write-Host "Unmatched } at index $i, line $line"
                    $braces = 0
                }
            } elseif ($char -eq '[') {
                $brackets++
            } elseif ($char -eq ']') {
                $brackets--
                if ($brackets -lt 0) {
                    $line = Get-LineNumber $i
                    Write-Host "Unmatched ] at index $i, line $line"
                    $brackets = 0
                }
            } elseif ($char -eq '(') {
                $parens++
            } elseif ($char -eq ')') {
                $parens--
                if ($parens -lt 0) {
                    $line = Get-LineNumber $i
                    Write-Host "Unmatched ) at index $i, line $line"
                    $parens = 0
                }
            }
        }
    }
    Write-Host "Final counts - Braces: $braces, Brackets: $brackets, Parens: $parens"
    Write-Host "Flags - inTemplate: $inTemplate, inSingle: $inSingle, inDouble: $inDouble"
} else {
    Write-Host "No script block found!"
}
