$c = Get-Content -Raw -Path 'frontend/my-bookings.html'
$match = [regex]::Match($c, '<script(?!\s+src)>([\s\S]*?)</script>')
if (-not $match.Success) {
    Write-Host "No script tag found!"
    exit
}
$js = $match.Groups[1].Value

# To find exact line, count lines before the script starts
$linesBefore = ($c.Substring(0, $match.Index) -split "`n").Length

$length = $js.Length
$i = 0

$stack = New-Object System.Collections.ArrayList

$line = 1
$col = 1

while ($i -lt $length) {
    $char = $js[$i]
    $nextChar = if ($i + 1 -lt $length) { $js[$i+1] } else { "" }
    
    # Handle newlines for line counting
    if ($char -eq "`n") {
        $line++
        $col = 1
    } else {
        $col++
    }
    
    # Get current context
    $currentContext = if ($stack.Count -gt 0) { $stack[$stack.Count - 1] } else { $null }
    
    if ($currentContext -eq 'line_comment') {
        if ($char -eq "`n") {
            $stack.RemoveAt($stack.Count - 1)
        }
        $i++
        continue
    }
    
    if ($currentContext -eq 'block_comment') {
        if ($char -eq '*' -and $nextChar -eq '/') {
            $stack.RemoveAt($stack.Count - 1)
            $i += 2
            $col++
            continue
        }
        $i++
        continue
    }
    
    if ($currentContext -eq 'double_quote') {
        if ($char -eq '\') {
            $i += 2
            $col++
            continue
        }
        if ($char -eq '"') {
            $stack.RemoveAt($stack.Count - 1)
        }
        $i++
        continue
    }
    
    if ($currentContext -eq 'single_quote') {
        if ($char -eq '\') {
            $i += 2
            $col++
            continue
        }
        if ($char -eq "'") {
            $stack.RemoveAt($stack.Count - 1)
        }
        $i++
        continue
    }
    
    if ($currentContext -eq 'template_string') {
        if ($char -eq '\') {
            $i += 2
            $col++
            continue
        }
        if ($char -eq '$' -and $nextChar -eq '{') {
            # Start interpolation context
            [void]$stack.Add('template_interpolation')
            # Also need to track the brace balance inside interpolation
            [void]$stack.Add('{')
            $i += 2
            $col++
            continue
        }
        if ($char -eq '`') {
            $stack.RemoveAt($stack.Count - 1)
        }
        $i++
        continue
    }
    
    # Check for comment start
    if ($char -eq '/' -and $nextChar -eq '/') {
        [void]$stack.Add('line_comment')
        $i += 2
        $col++
        continue
    }
    if ($char -eq '/' -and $nextChar -eq '*') {
        [void]$stack.Add('block_comment')
        $i += 2
        $col++
        continue
    }
    
    # Check for string start
    if ($char -eq '"') {
        [void]$stack.Add('double_quote')
        $i++
        continue
    }
    if ($char -eq "'") {
        [void]$stack.Add('single_quote')
        $i++
        continue
    }
    if ($char -eq '`') {
        [void]$stack.Add('template_string')
        $i++
        continue
    }
    
    # Check for braces, brackets, parens
    if ($char -eq '{') {
        [void]$stack.Add('{')
        $i++
        continue
    }
    if ($char -eq '[') {
        [void]$stack.Add('[')
        $i++
        continue
    }
    if ($char -eq '(') {
        [void]$stack.Add('(')
        $i++
        continue
    }
    
    if ($char -eq '}') {
        if ($stack.Count -eq 0) {
            Write-Host "Unmatched } at line $($line + $linesBefore), col $col"
        } else {
            $top = $stack[$stack.Count - 1]
            if ($top -eq '{') {
                $stack.RemoveAt($stack.Count - 1)
                # If we just closed the brace of a template interpolation, pop the interpolation context too
                if ($stack.Count -gt 0 -and $stack[$stack.Count - 1] -eq 'template_interpolation') {
                    $stack.RemoveAt($stack.Count - 1)
                }
            } else {
                Write-Host "Mismatch: found } but expected '$top' at line $($line + $linesBefore), col $col"
            }
        }
        $i++
        continue
    }
    
    if ($char -eq ']') {
        if ($stack.Count -eq 0) {
            Write-Host "Unmatched ] at line $($line + $linesBefore), col $col"
        } else {
            $top = $stack[$stack.Count - 1]
            if ($top -eq '[') {
                $stack.RemoveAt($stack.Count - 1)
            } else {
                Write-Host "Mismatch: found ] but expected '$top' at line $($line + $linesBefore), col $col"
            }
        }
        $i++
        continue
    }
    
    if ($char -eq ')') {
        if ($stack.Count -eq 0) {
            Write-Host "Unmatched ) at line $($line + $linesBefore), col $col"
        } else {
            $top = $stack[$stack.Count - 1]
            if ($top -eq '(') {
                $stack.RemoveAt($stack.Count - 1)
            } else {
                Write-Host "Mismatch: found ) but expected '$top' at line $($line + $linesBefore), col $col"
            }
        }
        $i++
        continue
    }
    
    $i++
}

if ($stack.Count -gt 0) {
    Write-Host "Unclosed contexts at end of script:"
    for ($j = $stack.Count - 1; $j -ge 0; $j--) {
        Write-Host "  $($stack[$j])"
    }
} else {
    Write-Host "All brackets, braces, and quotes are perfectly balanced!"
}
