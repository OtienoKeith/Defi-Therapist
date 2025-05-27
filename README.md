# 🧠 DeFi Therapist

DeFi Therapist is an AI-powered web application designed to help crypto traders analyze and understand their trading psychology. By connecting their Solana wallet, users receive personalized insights and actionable recommendations based on their recent trading behavior on the OKX DEX.

---

## 🚀 Live Demo

🔗 [Visit the Live App](https://defi-therapist-22eu5f0cd-keiths-projects-77cddbb3.vercel.app/)

> ✅ **Test Mode:** For demonstration purposes, a dummy wallet is used to simulate wallet connection and trade analysis.

---

## 📌 Features

- 🔗 **Phantom Wallet Integration** – Connect your Solana wallet seamlessly (dummy wallet used in test mode).
- 📊 **Trade Data Analysis** – Automatically fetch and parse OKX DEX trading history.
- 🤖 **AI-Powered Insights** – Get psychological and behavioral trading analysis using GPT-4o.
- 🌙 **Dark Mode UI** – Modern, accessible dark interface with responsive design.
- 📈 **Behavioral Breakdown** – View strengths, weaknesses, and improvement tips.
- 💾 **Persistent History** – Retrieve past analyses based on wallet address.

---

## 🧭 Complete Project Workflow

### 1. Initial Website Load
- Dark mode UI loads with:
  - Branding header
  - Hero section introducing the app
  - Wallet connect + analyze section
  - Hidden results area

### 2. Connecting a Wallet
- Click **"Connect Phantom Wallet"**
- Phantom extension prompts for approval *(simulated with dummy wallet in demo)*
- On success:
  - Wallet address & SOL balance displayed
  - Confirmation message shown

### 3. Loading Trading Data
- Automatically fetches recent trades via **OKX DEX API**
- Data includes:
  - Trading pairs (e.g., `SOL/USDC`)
  - Buy/sell prices, trade size, timestamps
  - PnL calculation
- "Trades Loaded" notification confirms retrieval

### 4. Analyzing Trading Behavior
- Click **"Get Trade Therapy Analysis"**
- Server:
  - Sends formatted trade data + wallet to OpenAI GPT-4o
  - Receives detailed AI analysis (JSON format)
  - Stores it in the database
- Loading spinner indicates progress

### 5. Viewing Results
- Results section reveals:
  - Summary of activity
  - Psychological insights
  - Strengths ✅ (green)
  - Weaknesses ❌ (red)
  - Clear, high-contrast UI in dark mode

### 6. Additional Actions
- Disconnect wallet
- Analyze again after new trades
- Access previous reports by wallet address

---

## ⚙️ Technical Stack

### Frontend
- `React` + `Vite`
- `Tailwind CSS`
- `Phantom Wallet Adapter`
- Axios for HTTP requests

### Backend
- `Node.js` + `Express`
- `OpenAI GPT-4o API`
- `OKX DEX API`
- MongoDB or Firebase (for analysis storage)

---

## 🛠 Installation

```bash
git clone https://github.com/OtienoKeith/Defi-Therapist.git
cd Defi-Therapist
npm install
