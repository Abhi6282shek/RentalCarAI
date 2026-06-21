$val = [System.Net.HttpListener]::new()
$val.Prefixes.Add("http://localhost:8000/")
$val.Start()
Write-Host "Server started at http://localhost:8000/"

while ($val.IsListening) {
    $context = $val.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    
    $filePath = Join-Path (Get-Item .).FullName "frontend$path"
    
    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        
        $ext = [System.IO.Path]::GetExtension($filePath)
        $contentType = "text/plain"
        if ($ext -eq ".html") { $contentType = "text/html" }
        elseif ($ext -eq ".js") { $contentType = "application/javascript" }
        elseif ($ext -eq ".css") { $contentType = "text/css" }
        
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $filePath")
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $response.OutputStream.Close()
}
