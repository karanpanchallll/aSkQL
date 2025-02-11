from fastapi import FastAPI, File, UploadFile
import pandas as pd
from langchain_ollama import OllamaLLM
import subprocess
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
ollama = OllamaLLM(base_url="http://localhost:11434", model="query_gen")

# Function to query the LLM
def query_llm(prompt: str):
    try:
        process = subprocess.Popen(
            ['ollama', 'run', 'query_gen'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate(prompt)

        if process.returncode == 0:
            return stdout.strip()
        else:
            return f"Error: {stderr.strip()}"
    except Exception as e:
        return f"An exception occurred: {str(e)}"

# API Route to Upload CSV
@app.post("/upload/")
async def upload_csv(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    return {"message": "File uploaded successfully", "preview": df.head().to_dict()}

# API Route to Generate SQL Query
@app.post("/generate-query/")
async def generate_query(data: dict):
    csv_preview = pd.DataFrame(data["preview"]).to_string(index=False)
    
    user_question = data["question"]

    prompt = f"Here is a sample of the CSV data:\n\n{csv_preview}\n\nBased on this data, generate a SQL query that answers the following question: {user_question}"
    response = query_llm(prompt)
    
    return {"sql_query": response}

# API Route to Explain SQL Query
@app.post("/explain-query/")
async def explain_query(data: dict):
    explanation_prompt = f"Explain the following SQL query:\n{data['query']}"
    explanation = query_llm(explanation_prompt)
    formatted_explanation = explanation.replace(". ", ".\n")
    
    return {"explanation": formatted_explanation}

# Run FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
