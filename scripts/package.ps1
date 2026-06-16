$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$artifactDir = Join-Path $root "artifacts"
$zipPath = Join-Path $artifactDir "work-order-dashboard.zip"

if (!(Test-Path $artifactDir)) {
  New-Item -ItemType Directory -Path $artifactDir | Out-Null
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath
}

$items = @(
  "index.html",
  ".gitignore",
  "package.json",
  "package-lock.json",
  "README.md",
  "tsconfig.json",
  "tsconfig.node.json",
  "vite.config.ts",
  "vitest.config.ts",
  "src",
  "tests",
  "scripts"
)

$paths = $items |
  ForEach-Object { Join-Path $root $_ } |
  Where-Object { Test-Path $_ }

Compress-Archive -Path $paths -DestinationPath $zipPath -Force
Write-Host "Created $zipPath"
