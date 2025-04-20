# 🧠 Multilingual Note-Taking Agent – Frontend (React + TS)

This is the **React frontend** for the Multilingual Note-Taking AI Agent built for the **HOLON x KBI AI AGENTS Hackathon 2025**. It enables users to upload multilingual meeting audio, view AI summaries, search transcripts, and download meeting notes as PDF.

---

## ✨ Features

- 🎤 Upload meeting audio (supports English, Mandarin, Cantonese)
- 📄 View meeting summaries with key points and action items
- 🔍 Search transcript using keywords
- 📥 Download meeting summary as a PDF
- 🖥️ Built with **React** + **Fetch API**

---

## 🧱 Tech Stack

| Layer        | Tool            |
|--------------|-----------------|
| Frontend     | React (Vite or CRA) |
| HTTP Client  | Fetch API       |
| Backend API  | FastAPI         |
| Styling      | TailwindCSS  |


## Preview 

<img width="600" alt="image" src="https://github.com/user-attachments/assets/aa731c41-8467-4f45-97ea-fcb47c1d0b8f" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/728a2591-4ee1-46db-b314-a6927d82cb9d" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/84ff0e07-d0bc-4bb2-9be6-c941c74bf70c" />
<img width="600" alt="image" src="https://github.com/user-attachments/assets/e4182f97-a511-4be9-ae0d-7eda8b96bb8b" />





## Output PDF 
https://drive.google.com/file/d/1CIZKvAmqAFTEykWtCMPoqStLeEEhb2cX/view?usp=sharing

---

## 🧪 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/holon-note-agent
npm i
npm run dev
```

``` mermaid
graph TB
    %% Global entities
    Browser["Browser / User Agent"]:::external
    Static["Vite Dev Server / Static Host"]:::static
    Browser -->|"Requests index.html"| Static
    Static -->|"Serves index.html & JS Bundle"| Bundle["JS Bundle (.js)"]:::bundle

    %% React Application
    Bundle -->|"Executes"| Main["main.tsx"]:::code
    Main -->|"Renders"| App["App.tsx"]:::code

    subgraph "Frontend Client"
        direction TB
        App --> Navbar["Navbar"]:::code

        subgraph "Pages"
            direction TB
            Home["Home.tsx"]:::pages
            RecordPage["RecordPage.tsx"]:::pages
            ResultsPage["ResultsPage.tsx"]:::pages
            SearchPage["SearchPage.tsx"]:::pages
        end

        subgraph "UI Primitives"
            direction TB
            Button["button.tsx"]:::ui
            Card["card.tsx"]:::ui
            Input["input.tsx"]:::ui
            Progress["progress.tsx"]:::ui
            Tabs["tabs.tsx"]:::ui
            Toaster["toaster.tsx"]:::ui
            ToastHook["use-toast.ts"]:::ui
        end
    end

    App -->|"Router Navigation"| Home
    App -->|"Router Navigation"| RecordPage
    App -->|"Router Navigation"| ResultsPage
    App -->|"Router Navigation"| SearchPage

    Home -->|"fetch data"| API
    RecordPage -->|"fetch data"| API
    ResultsPage -->|"fetch data"| API
    SearchPage -->|"fetch data"| API

    %% Services & Utilities
    subgraph "Services & Utilities"
        direction TB
        API["api.ts"]:::service
        Utils["utils.ts"]:::code
        Types["types.ts"]:::code
    end

    API -->|"HTTP Request"| ExternalAPI["External REST API"]:::external
    Utils --- Pages
    Utils --- UI

    %% Click Events
    click Static "https://github.com/sivangbagri/note_fe/blob/master/index.html"
    click Main "https://github.com/sivangbagri/note_fe/blob/master/src/main.tsx"
    click App "https://github.com/sivangbagri/note_fe/blob/master/src/App.tsx"
    click Navbar "https://github.com/sivangbagri/note_fe/blob/master/src/components/Navbar.tsx"
    click Button "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/button.tsx"
    click Card "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/card.tsx"
    click Input "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/input.tsx"
    click Progress "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/progress.tsx"
    click Tabs "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/tabs.tsx"
    click Toaster "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/toaster.tsx"
    click ToastHook "https://github.com/sivangbagri/note_fe/blob/master/src/components/ui/use-toast.ts"
    click Home "https://github.com/sivangbagri/note_fe/blob/master/src/pages/Home.tsx"
    click RecordPage "https://github.com/sivangbagri/note_fe/blob/master/src/pages/RecordPage.tsx"
    click ResultsPage "https://github.com/sivangbagri/note_fe/blob/master/src/pages/ResultsPage.tsx"
    click SearchPage "https://github.com/sivangbagri/note_fe/blob/master/src/pages/SearchPage.tsx"
    click API "https://github.com/sivangbagri/note_fe/blob/master/src/services/api.ts"
    click Utils "https://github.com/sivangbagri/note_fe/blob/master/src/lib/utils.ts"
    click Types "https://github.com/sivangbagri/note_fe/blob/master/src/types.ts"
    click ViteConfig "https://github.com/sivangbagri/note_fe/blob/master/vite.config.ts"
    click TSConfig1 "https://github.com/sivangbagri/note_fe/blob/master/tsconfig.json"
    click TSConfig2 "https://github.com/sivangbagri/note_fe/blob/master/tsconfig.app.json"
    click TSConfig3 "https://github.com/sivangbagri/note_fe/blob/master/tsconfig.node.json"
    click ESLint "https://github.com/sivangbagri/note_fe/blob/master/eslint.config.js"

    %% Styles
    classDef external fill:#dddddd,stroke:#888888,color:#333333;
    classDef static fill:#f0f8ff,stroke:#add8e6,color:#000000;
    classDef bundle fill:#e6f7ff,stroke:#91d5ff,color:#000000;
    classDef code fill:#e6ffe6,stroke:#85e085,color:#000000;
    classDef pages fill:#fff5e6,stroke:#ffd591,color:#000000;
    classDef ui fill:#ffe6f2,stroke:#ffafd8,color:#000000;
    classDef service fill:#e6e6ff,stroke:#b3b3ff,color:#000000;
```

