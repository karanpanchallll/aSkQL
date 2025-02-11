# aSkQL 🧐💡

aSkQL is an AI-powered SQL query generator and explainer that allows users to upload CSV datasets, ask questions, and receive dynamically generated SQL queries along with detailed explanations.  

---

## 🚀 Features  

✅ **CSV Upload & Schema Detection** – Automatically extracts column names and displays a preview of the dataset.  
✅ **AI-Powered Query Generation** – Generates SQL queries based on user-inputted natural language questions.  
✅ **SQL Query Explanation** – Provides detailed, structured explanations for generated SQL queries.  
✅ **User-Friendly UI** – Dark-themed, responsive, and structured UI with fixed query display boxes.  
✅ **Lightweight & Fast** – Uses FastAPI as the backend and React for an interactive frontend.  

---

## 📸 Screenshots  



![img1](https://github.com/user-attachments/assets/3b2c7f33-a3b5-4be2-9dcb-cd4616cf59b9)

![img3](https://github.com/user-attachments/assets/bff35f72-5803-4923-9bb3-22d5eea92481)

![img2](https://github.com/user-attachments/assets/21075988-fd30-4db3-9465-e17d5fe38e28)



## 🏗️ Tech Stack  

- **Frontend:** React, CSS  
- **Backend:** FastAPI (Python)  
- **AI Model:** LLM-powered SQL generation 
- **Data Handling:** Pandas, Axios  


## ⚡ Setup & Installation  

### 1Clone the Repository  
```sh
git clone https://github.com/KaranYourGitHubUsername/aSkQL.git
cd aSkQL
2 Backend Setup (FastAPI)

cd backend
pip install -r requirements.txt
uvicorn main:app --reload
3 Frontend Setup (React)

cd frontend
npm install
npm start
🔹 Visit: http://localhost:3000 to use the app

🌟 How to Use?
1️⃣ Upload a CSV file – The app reads column names and previews the data.
2️⃣ Enter a question – Ask something like "Show total sales per month?"
3️⃣ Generate SQL – The AI converts your question into an SQL query.
4️⃣ Explain SQL – Click Explain Query to understand what the query does.

🔥 Future Enhancements
✅ Support for multiple file formats (Excel, JSON)
✅ Query Optimization Suggestions
✅ Downloadable SQL Query
✅ Cloud Deployment
🛠️ Contributing
Want to improve aSkQL? Feel free to fork this repo and submit a PR. 🚀

Fork the project
Create a new feature branch (git checkout -b feature-name)
Commit changes (git commit -m "Added new feature")
Push to GitHub (git push origin feature-name)
Submit a PR!
📜 License
This project is licensed under the MIT License.





🙌 Credits
👨‍💻 Developed by Karan
🚀 Made with ❤️ using FastAPI & React
