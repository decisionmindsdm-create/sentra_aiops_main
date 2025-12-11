# Script to clear frontend cache and restart it
Write-Host "Clearing Frontend Cache and Restarting..." -ForegroundColor Yellow
Write-Host ""

# Navigate to keep-ui directory
Set-Location "c:\Users\Localuser\Pictures\Partha Dm\DM-AIops\keep-ui"

# Clear Next.js cache
Write-Host "1. Clearing Next.js cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✓ .next directory removed" -ForegroundColor Green
} else {
    Write-Host "   - .next directory not found (already clean)" -ForegroundColor Gray
}

# Clear node_modules/.cache
Write-Host "2. Clearing node_modules cache..." -ForegroundColor Cyan
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "   ✓ node_modules\.cache removed" -ForegroundColor Green
} else {
    Write-Host "   - node_modules\.cache not found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Cache cleared successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Now starting the frontend..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the frontend
npm run dev
