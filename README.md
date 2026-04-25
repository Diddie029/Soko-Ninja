<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cda7867f-b819-40e2-ac93-896253e794db

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

   # 🌾 SokoNinja

**SokoNinja** is an AI-powered Market Negotiator that helps small-scale farmers in Kenya make better selling decisions using market data, predictive insights, and weather analysis.

---

## 🎯 Problem

Farmers often:
- Sell produce at low prices due to middlemen
- Lack awareness of better markets (e.g., Nairobi vs Eldoret)
- Don’t have access to future price trends
- Don’t understand how weather affects supply and prices

👉 Result: Loss of income despite high demand elsewhere.

---

## 💡 Solution

SokoNinja provides:
- 📊 Market price comparison  
- 📈 Predictive pricing insights  
- 🤝 Negotiation assistance  
- 🌦️ Weather-based analysis  
- 🌍 Multilingual AI (English, Kiswahili, Sheng)

---

## 🤖 Chatbot

**Nego na Mkulima**  
- Conversational AI assistant  
- Uses Kenyan tone (Sheng/Swahili/English)  
- Gives practical, actionable advice  

---

## ⚙️ Features

- **Market Intelligence** → Compare prices across regions  
- **Price Prediction** → Know when to sell  
- **Negotiation Tips** → Know how to sell  
- **Weather Insights** → Understand price changes  
- **Language Switcher** → 🌐 English | Kiswahili | Sheng | Auto  

---

## 🖥️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js (Express)  
- **AI:** Gemini API (or simulated logic)  

---

## 🧾 Input Example

Crop: Maize

Location: Eldoret

Prices: Nairobi 5200, Eldoret 4600

Weather: Heavy rainfall expected

Demand: High in Nairobi


---

## 📊 Output

Displayed in cards:
- 📊 Market Comparison  
- 📈 Trend Prediction  
- 🤝 Negotiation Advice  
- 🌦️ Weather Insight  
- 📍 Recommendation  

---

## 🚀 Setup

```bash
npm install
node server.js

