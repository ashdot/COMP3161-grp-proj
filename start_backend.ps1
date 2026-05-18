$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

$VenvPath = Join-Path $PSScriptRoot ".venv"
$PythonExe = Join-Path $VenvPath "Scripts\python.exe"
$TempPath = Join-Path $PSScriptRoot ".setup_tmp"
$EnvPath = Join-Path $PSScriptRoot ".env"
$EnvExamplePath = Join-Path $PSScriptRoot ".env.example"

function Invoke-Native {
    param(
        [Parameter(Mandatory = $true)]
        [string] $FilePath,

        [Parameter(Mandatory = $true)]
        [string[]] $Arguments
    )

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed with exit code ${LASTEXITCODE}: $FilePath $($Arguments -join ' ')"
    }
}

function Assert-RepoLocalPath {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    $root = [System.IO.Path]::GetFullPath($PSScriptRoot)
    $target = [System.IO.Path]::GetFullPath($Path)

    if (-not $target.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to modify path outside repo: $target"
    }
}

function New-VirtualEnvironment {
    if (Test-Path $PythonExe) {
        Write-Host "Using existing virtual environment at .venv."
        return
    }

    if ((Test-Path $VenvPath) -and -not (Test-Path $PythonExe)) {
        Write-Host "Found incomplete .venv; recreating it."
        Assert-RepoLocalPath $VenvPath
        Remove-Item -Recurse -Force -LiteralPath $VenvPath
    }

    Write-Host "Creating virtual environment at .venv..."
    Invoke-Native "py" @("-3", "-m", "venv", ".venv")
}

$OriginalTemp = $env:TEMP
$OriginalTmp = $env:TMP

try {
    New-Item -ItemType Directory -Force -Path $TempPath | Out-Null
    $env:TEMP = $TempPath
    $env:TMP = $TempPath

    New-VirtualEnvironment

    Write-Host "Installing backend requirements..."
    Invoke-Native $PythonExe @("-m", "pip", "install", "-r", "requirements.txt")

    if ((-not (Test-Path $EnvPath)) -and (Test-Path $EnvExamplePath)) {
        Copy-Item -Path $EnvExamplePath -Destination $EnvPath
        Write-Host "Created .env from .env.example. Check DB_PASSWORD before using the API."
    }

    Write-Host ""
    Write-Host "Starting Flask backend at http://127.0.0.1:5000 ..."
    Invoke-Native $PythonExe @("app.py")
}
finally {
    $env:TEMP = $OriginalTemp
    $env:TMP = $OriginalTmp

    if (Test-Path $TempPath) {
        Remove-Item -Recurse -Force -LiteralPath $TempPath -ErrorAction SilentlyContinue
    }
}
