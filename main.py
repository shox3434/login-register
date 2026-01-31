from fastapi import FastAPI,HTTPException
from pydantic import BaseModel,EmailStr,Field
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4
import secrets
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class sample(BaseModel):
    id:int
    name:str
    soName:str
    age:int
    
class Register(BaseModel):
    fullName:str
    email:EmailStr
    password:str
    
class Login(BaseModel):
    email:EmailStr
    password:str
    
class Tamplete(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    img:str
    title:str
    description:str
    color:str
    price:int
    
users = [{
    "id":1,
    "name":"Arslon",
    "soName":"Boltayev",
    "age":23
}]

user_collect=[]
announcement_collect = []

@app.get('/api')
def getFunc():
    return users

@app.post('/app-add')
def postFunc(change:sample):
    users.append(change)
    return users
@app.put('/api-update/{user_id}')
def updateUser(user_id:int,updateName:sample):
    for user in users:
        if user["id"] == user_id:
            user["id"] = updateName.id
            user["name"] = updateName.name
            user["soName"] = updateName.soName
            user["age"] = updateName.age
            return f"{user_id} ozgartirildi {updateName.name}"
    return f"{user_id} qandaydir xatolik boldi"       
@app.delete('/api-delete/{user_id}')
def deleteUser(user_id:int):
    for user in users:
        if user["id"] == user_id:
            users.remove(user)
            return user_id
    return f"qanadaydir xatolik bor {user}"
@app.post('/api-register')
def registerUser(user:Register):
    for us in user_collect:
        if us["email"] == user.email:
            raise HTTPException(status_code=401, detail="BU email bor ")
    new_user_data = user.dict()
    
    # 3. AVTOMATIK ID VA TOKEN BERISH
    new_user_data["id"] = str(uuid4())[:8] # Unikal 8 talik ID (masalan: 'a1b2c3d4')
    new_user_data["token"] = secrets.token_hex(16) # Xavfsiz 32 talik token
    
    user_collect.append(new_user_data)
    
    return {"status": "success",
        "message": "Ro'yxatdan o'tdingiz",
        "data": {
            "id": new_user_data["id"],
            "token": new_user_data["token"]}
        }     
@app.post('/api-login')
def loginUser(user:Login):
    for us in user_collect  :
        if us["email"] == user.email and us["password"] == user.password:
            return {
                "status": "success",
                "xabar": "Togri bo'ldi",
                "token": us["token"]  # MANA SHU QATORNI QO'SHING!
            }
    raise HTTPException(status_code=(400), detail="login yoki parol xato")

@app.post('/api-create-announcement')
def createAnnouncement(template:Tamplete):
    new_add = template.dict()
    
    announcement_collect.append(new_add)
    
    return {"status": "success", "template": new_add}