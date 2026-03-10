from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiofiles
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ========== MODELS ==========

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "active"

class NewsletterCreate(BaseModel):
    email: EmailStr

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: str
    phone: str
    job_title: str
    company: str
    country: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "unread"

class ContactCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    job_title: str
    company: str
    country: str
    message: Optional[str] = None

class JobListing(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    location: str
    type: str
    department: str
    description: str
    requirements: List[str]
    benefits: List[str]
    posted_at: str

class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    name: str
    email: str
    phone: Optional[str] = None
    cv_filename: str
    cv_path: str
    cover_letter: Optional[str] = None
    applied_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class ApplicationResponse(BaseModel):
    id: str
    job_id: str
    name: str
    email: str
    status: str
    applied_at: str


# ========== STATIC JOB DATA ==========

JOBS = [
    {
        "id": "ai-engineer-sr",
        "title": "Senior AI Engineer",
        "location": "Berlin, Germany / Remote",
        "type": "Full-time",
        "department": "Research & Development",
        "description": "Join our core R&D team to develop physical AI systems that understand and interact with the real world. You'll work on cutting-edge projects in robotics, computer vision, and reinforcement learning.",
        "requirements": [
            "5+ years experience in AI/ML engineering",
            "Strong background in PyTorch or TensorFlow",
            "Experience with robotics or embodied AI",
            "PhD preferred in Computer Science, Robotics, or related field",
            "Publications in top-tier venues (NeurIPS, ICML, CVPR)"
        ],
        "benefits": [
            "Competitive salary + equity",
            "Flexible remote work policy",
            "Annual research budget",
            "Conference attendance sponsorship",
            "Relocation support"
        ],
        "posted_at": "2024-11-15"
    },
    {
        "id": "ai-engineer-ml",
        "title": "Machine Learning Engineer",
        "location": "San Francisco, USA / Remote",
        "type": "Full-time",
        "department": "Engineering",
        "description": "Build and deploy production-grade ML systems for our physical AI products. You'll bridge the gap between research prototypes and robust, scalable implementations.",
        "requirements": [
            "3+ years experience in ML engineering",
            "Proficiency in Python, C++, and ML frameworks",
            "Experience with MLOps and model deployment",
            "Strong software engineering fundamentals",
            "Experience with real-time systems preferred"
        ],
        "benefits": [
            "Competitive salary + equity",
            "Health, dental, and vision insurance",
            "Unlimited PTO",
            "Learning & development budget",
            "State-of-the-art hardware"
        ],
        "posted_at": "2024-11-20"
    },
    {
        "id": "robotics-engineer",
        "title": "Robotics Software Engineer",
        "location": "Berlin, Germany",
        "type": "Full-time",
        "department": "Robotics",
        "description": "Design and implement software systems for our physical AI robotic platforms. Work on motion planning, control systems, and sensor fusion for next-generation robots.",
        "requirements": [
            "4+ years experience in robotics software",
            "Strong C++ and ROS/ROS2 experience",
            "Experience with motion planning and control",
            "Knowledge of sensor fusion techniques",
            "Experience with hardware-software integration"
        ],
        "benefits": [
            "Competitive salary + equity",
            "Cutting-edge robotics lab access",
            "Flexible work hours",
            "International conference participation",
            "Team building events"
        ],
        "posted_at": "2024-11-25"
    },
    {
        "id": "research-scientist",
        "title": "Research Scientist - Physics AI",
        "location": "London, UK / Remote",
        "type": "Full-time",
        "department": "Research",
        "description": "Conduct fundamental research on physics-informed neural networks and their applications. Publish papers, develop new algorithms, and collaborate with our product teams.",
        "requirements": [
            "PhD in Physics, Computer Science, or related field",
            "Track record of publications in top venues",
            "Strong mathematical background",
            "Experience with physics simulation",
            "Excellent communication skills"
        ],
        "benefits": [
            "Competitive research salary + equity",
            "Dedicated research time",
            "Publication bonuses",
            "Sabbatical opportunities",
            "Global collaboration network"
        ],
        "posted_at": "2024-11-28"
    }
]


# ========== ROUTES ==========

@api_router.get("/")
async def root():
    return {"message": "Kedorion API Online", "status": "operational"}


# Newsletter routes
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(data: NewsletterCreate):
    # Check if email already exists
    existing = await db.newsletter.find_one({"email": data.email}, {"_id": 0})
    if existing:
        if existing.get("status") == "active":
            return {"success": True, "message": "You are already subscribed!", "already_subscribed": True}
        else:
            # Reactivate subscription
            await db.newsletter.update_one(
                {"email": data.email},
                {"$set": {"status": "active", "subscribed_at": datetime.now(timezone.utc).isoformat()}}
            )
            return {"success": True, "message": "Your subscription has been reactivated!", "reactivated": True}
    
    subscription = NewsletterSubscription(email=data.email)
    doc = subscription.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter.insert_one(doc)
    return {"success": True, "message": "Successfully subscribed to the newsletter!", "id": subscription.id}


@api_router.get("/newsletter/subscribers")
async def get_subscribers():
    subscribers = await db.newsletter.find({"status": "active"}, {"_id": 0}).to_list(1000)
    return {"subscribers": subscribers, "count": len(subscribers)}


# Contact routes
@api_router.post("/contact")
async def submit_contact(data: ContactCreate):
    contact = ContactMessage(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone=data.phone,
        job_title=data.job_title,
        company=data.company,
        country=data.country,
        message=data.message
    )
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return {
        "success": True, 
        "message": "Your message has been received. We'll get back to you soon!",
        "id": contact.id
    }


@api_router.get("/contact/messages")
async def get_messages():
    messages = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return {"messages": messages, "count": len(messages)}


# Jobs routes
@api_router.get("/jobs")
async def get_jobs():
    return {"jobs": JOBS, "count": len(JOBS)}


@api_router.get("/jobs/{job_id}")
async def get_job(job_id: str):
    job = next((j for j in JOBS if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@api_router.post("/jobs/{job_id}/apply")
async def apply_job(
    job_id: str,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    cover_letter: str = Form(None),
    cv: UploadFile = File(...)
):
    # Verify job exists
    job = next((j for j in JOBS if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Validate CV file type
    allowed_extensions = ['.pdf', '.doc', '.docx']
    file_ext = Path(cv.filename).suffix.lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
        )
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}_{cv.filename}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as f:
        content = await cv.read()
        await f.write(content)
    
    # Create application record
    application = JobApplication(
        job_id=job_id,
        name=name,
        email=email,
        phone=phone,
        cv_filename=cv.filename,
        cv_path=str(file_path),
        cover_letter=cover_letter
    )
    
    doc = application.model_dump()
    doc['applied_at'] = doc['applied_at'].isoformat()
    
    await db.applications.insert_one(doc)
    
    return {
        "success": True,
        "message": f"Your application for {job['title']} has been submitted successfully!",
        "application_id": application.id
    }


@api_router.get("/jobs/{job_id}/applications")
async def get_job_applications(job_id: str):
    applications = await db.applications.find({"job_id": job_id}, {"_id": 0, "cv_path": 0}).to_list(1000)
    return {"applications": applications, "count": len(applications)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
