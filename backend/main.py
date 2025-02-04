from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Создание экземпляра FastAPI
app = FastAPI()

# Настройка CORS для разрешения запросов с фронтенда (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # адрес фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модель для данных логина
class LoginData(BaseModel):
    email: str
    password: str

# Эндпоинт для логина
@app.post("/login")
def login(data: LoginData):
    # Проверка правильности логина и пароля
    if data.email == "test_user@example.com" and data.password == "1234":
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# Главная страница
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI!"}

# Эндпоинт для данных
@app.get("/data")
def get_data():
    return [
    {"id": 1, "name": "John Doe", "age": 28, "email": "john.doe@example.com"},
    {"id": 2, "name": "Jane Smith", "age": 34, "email": "jane.smith@example.com"},
    {"id": 3, "name": "Alice Johnson", "age": 25, "email": "alice.johnson@example.com"},
    {"id": 4, "name": "Bob Brown", "age": 40, "email": "bob.brown@example.com"},
    {"id": 5, "name": "Charlie Wilson", "age": 31, "email": "charlie.wilson@example.com"},
    {"id": 6, "name": "Emily Davis", "age": 29, "email": "emily.davis@example.com"},
    {"id": 7, "name": "Daniel Taylor", "age": 38, "email": "daniel.taylor@example.com"},
    {"id": 8, "name": "Sophia Martinez", "age": 27, "email": "sophia.martinez@example.com"},
    {"id": 9, "name": "James Anderson", "age": 35, "email": "james.anderson@example.com"},
    {"id": 10, "name": "Olivia Thomas", "age": 22, "email": "olivia.thomas@example.com"},
    {"id": 11, "name": "Michael Harris", "age": 36, "email": "michael.harris@example.com"},
    {"id": 12, "name": "Emma Clark", "age": 24, "email": "emma.clark@example.com"},
    {"id": 13, "name": "David Lee", "age": 33, "email": "david.lee@example.com"},
    {"id": 14, "name": "Isabella Hall", "age": 26, "email": "isabella.hall@example.com"},
    {"id": 15, "name": "Matthew Allen", "age": 39, "email": "matthew.allen@example.com"},
    {"id": 16, "name": "Mia Young", "age": 21, "email": "mia.young@example.com"},
    {"id": 17, "name": "Ethan King", "age": 30, "email": "ethan.king@example.com"},
    {"id": 18, "name": "Ava Wright", "age": 28, "email": "ava.wright@example.com"},
    {"id": 19, "name": "Alexander Scott", "age": 32, "email": "alexander.scott@example.com"},
    {"id": 20, "name": "Charlotte Green", "age": 23, "email": "charlotte.green@example.com"},
]

