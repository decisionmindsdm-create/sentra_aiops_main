# Restart Dev Server Script
# This script clears the Next.js cache and restarts the development server

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Restarting Development Server" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear Next.js cache
Write-Host "[1/3] Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Cache cleared successfully!" -ForegroundColor Green
} else {
    Write-Host "✓ No cache to clear" -ForegroundColor Green
}
Write-Host ""

# Step 2: Clear node_modules/.cache if exists
Write-Host "[2/3] Clearing node_modules cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✓ Node modules cache cleared!" -ForegroundColor Green
} else {
    Write-Host "✓ No node modules cache to clear" -ForegroundColor Green
}
Write-Host ""

# Step 3: Start the dev server
Write-Host "[3/3] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "IMPORTANT: Clear Your Browser!" -ForegroundColor Red
Write-Host "================================" -ForegroundColor Cyan
Write-Host "The username is cached in your browser session." -ForegroundColor Yellow
Write-Host "To see 'Dm Vivek' instead of 'Keep', you must:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Option 1: Open in Incognito/Private Window" -ForegroundColor White
Write-Host "  Option 2: Clear browser cookies and refresh" -ForegroundColor White
Write-Host "  Option 3: Sign out and sign back in" -ForegroundColor White
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Start the dev server
npm run dev
