@echo off
chcp 65001 >nul
set "TARGET_DIR=%~dp0"
cd /d "%TARGET_DIR%"

powershell -Command "Invoke-WebRequest -Uri 'https://github.com/kcydvn-a11y/REMOVEADBLOCK-PRO/archive/refs/heads/main.zip' -OutFile 'update_temp.zip'"
if not exist "update_temp.zip" exit /b

powershell -Command "Expand-Archive -Path 'update_temp.zip' -DestinationPath 'update_extracted' -Force"
xcopy /s /y "update_extracted\REMOVEADBLOCK-PRO-main\*" "%TARGET_DIR%" >nul

del "update_temp.zip"
rd /s /q "update_extracted"
exit