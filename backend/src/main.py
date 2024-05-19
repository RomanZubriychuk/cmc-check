from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.router import router as cryptocurrencies_router

app = FastAPI()
app.include_router(cryptocurrencies_router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
