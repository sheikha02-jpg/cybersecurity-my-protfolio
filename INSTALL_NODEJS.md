# How to Install Node.js on Windows

## Quick Installation Guide

### Option 1: Official Installer (Recommended)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Click "Download Node.js (LTS)" - this is the recommended version
   - The file will be something like `node-v20.x.x-x64.msi`

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - **IMPORTANT:** Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install" and wait for it to finish

3. **Verify Installation:**
   - Close and reopen your terminal/PowerShell
   - Run these commands:
     ```bash
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

### Option 2: Using Chocolatey (If you have it)

```bash
choco install nodejs-lts
```

### Option 3: Using Winget (Windows Package Manager)

```bash
winget install OpenJS.NodeJS.LTS
```

---

## After Installing Node.js

Once Node.js is installed, come back to this project and run:

```bash
npm install
npm run dev
```

Then open your browser to: `http://localhost:3000`

---

## Troubleshooting

**If `node` or `npm` commands still don't work after installation:**

1. **Restart your terminal/PowerShell** - This is important!
2. **Check PATH environment variable:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "System variables", find "Path"
   - Make sure `C:\Program Files\nodejs\` is in the list
3. **Restart your computer** if needed

---

## Need Help?

If you're still having issues, let me know and I'll help troubleshoot!

