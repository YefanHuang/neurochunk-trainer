from fastapi import FastAPI
from fastapi.middleware.cors import CORSMultipartMiddleware, CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="NeuroChunk Trainer API",
    description="Backend API powered by LangGraph and MiMo V2.5 API",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "NeuroChunk API is running."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
