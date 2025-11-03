# 🌐 CSV Orbit — Proof of Concept (POC)

> **Always in motion. Always in view.**  
> AI-Enabled Opportunity Radar for Climate Smart Ventures

---

## 🧩 Overview

**CSV Orbit** automates the discovery, extraction, summarization, and scoring of
development and funding opportunities from global sources such as  
**ADB, World Bank, Devex, UNDP, and USAID**.

This POC demonstrates the end-to-end flow from **data collection**
→ **AI summarization**
→ **dashboard visualization**.

---

## ⚙️ Architecture Layers

| Layer | Purpose | Tools / Tech |
|--------|----------|--------------|
| 1️⃣ Data Collection | Scrape or fetch tenders & project listings | `Apify` / `BeautifulSoup` / `requests` |
| 2️⃣ Extraction | Parse key fields (title, value, deadline, link) | `Python` + regex + HTML parsing |
| 3️⃣ AI Summarization | Summarize + tag opportunities by relevance | `OpenAI API` / `Gemini` / `Kabaw.AI` |
| 4️⃣ Data Store | Persist structured data | `SQLite` / `Google Sheets API` |
| 5️⃣ Visualization | View, filter, export | `Streamlit` or `Dash` |
| 6️⃣ Notification | Push high-score items to Slack | `Slack API` / `Zapier` webhook |

---

## 🧱 Project Structure

```
csv-orbit-poc/
├── data/                 # Raw & processed opportunity data
├── notebooks/            # Experiments and AI summarization tests
├── src/
│   ├── collectors/       # Source-specific scrapers (adb.py, devex.py)
│   ├── processors/       # Cleaning and parsing utilities
│   ├── summarizer/       # GPT/Kabaw summarization scripts
│   ├── dashboard/        # Streamlit app components
│   └── main.py           # Entry point
├── config/
│   ├── sources.yml       # List of sources and URLs
│   └── secrets.env       # API keys (excluded from git)
├── requirements.txt
└── README.md
```

---

## 🧠 Data Flow

```
[ADB / Devex / WB APIs]
          │
          ▼
   [Scrapers / API fetchers]
          │
          ▼
     [JSON → Pandas DF]
          │
          ▼
 [AI Summarizer → relevance_score]
          │
          ▼
  [SQLite / Sheets / Notion DB]
          │
          ▼
 [Streamlit Dashboard + Slack Alerts]
```

---

## 🚀 Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/your-org/csv-orbit-poc.git
cd csv-orbit-poc
```

### 2. Create Virtual Env
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Variables (`config/secrets.env`)
```bash
OPENAI_API_KEY=your_key_here
SLACK_WEBHOOK_URL=your_url_here
```

### 5. Run Collector (e.g., ADB)
```bash
python src/collectors/adb.py
```

### 6. Run Dashboard
```bash
streamlit run src/dashboard/app.py
```

---

## 🧩 Example Output

| title | agency | deadline | relevance_score | summary |
|-------|---------|-----------|----------------|----------|
| Digital Energy Transition TA | ADB | 2025-03-21 | 0.94 | Technical assistance for renewable integration and AI analytics. |

---

## 🛠️ Roadmap (POC → MVP)

| Phase | Scope | Deliverable |
|-------|--------|-------------|
| **1. Manomatic** | Automate 2–3 sources (ADB, Devex) + AI summarization | Daily CSV/Sheet feed |
| **2. Semi-Auto** | Add scoring dashboard + Slack alerts | Shared visualization |
| **3. Automatic** | Continuous ingestion + learning filters | Live BD radar |
| **4. Intelligence Hub** | Predictive analytics & partner mapping | Enterprise platform |

---

## 💰 Indicative Investment (Full Build)

| Phase | Estimated Cost (USD) |
|--------|----------------------|
| MVP (3 sources + dashboard) | 5 000 – 8 000 |
| Semi-Auto & Alerts | 12 000 – 20 000 |
| Full AI Integration | 25 000 – 35 000 |

---

## 📄 License
Internal CSV prototype – not for public distribution.

---

## 🙌 Authors / Maintainers
**Climate Smart Ventures (CSV) Tech Ventures Team**  
Lead: *Martin Banaria*  
Contributors: *Likha Labs / Kabaw.AI / CSV Ops Team*
