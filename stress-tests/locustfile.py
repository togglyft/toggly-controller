from locust import HttpUser, between, task
import random

features = [1,8,9,10,11]

class WebsiteUser(HttpUser):
    wait_time = between(0, 1)
    
    
    @task
    def getAll(self):
        self.client.get("/api/features")

    @task
    def getOne(self):
        self.client.get("/api/features/"+str(random.choice(features)))
