import requests
import sys
from datetime import datetime
import json

class KedorionAPITester:
    def __init__(self):
        self.base_url = "https://reality-anchor.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'} if not files else {}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files)
                else:
                    response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if 'message' in response_data:
                        print(f"   Message: {response_data['message']}")
                except:
                    pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Raw response: {response.text}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_health(self):
        """Test API health check"""
        return self.run_test("API Health Check", "GET", "", 200)

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        test_email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
        success, response = self.run_test(
            "Newsletter Subscription",
            "POST",
            "newsletter/subscribe",
            200,
            data={"email": test_email}
        )
        return success

    def test_newsletter_subscribers_list(self):
        """Test getting newsletter subscribers"""
        return self.run_test("Get Newsletter Subscribers", "GET", "newsletter/subscribers", 200)

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "subject": "Test Contact Message",
            "message": "This is a test contact message from the API testing suite."
        }
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        return success

    def test_contact_messages_list(self):
        """Test getting contact messages"""
        return self.run_test("Get Contact Messages", "GET", "contact/messages", 200)

    def test_jobs_list(self):
        """Test getting jobs list"""
        success, response = self.run_test("Get Jobs List", "GET", "jobs", 200)
        if success and 'jobs' in response:
            jobs_count = len(response['jobs'])
            print(f"   Found {jobs_count} job listings")
            if jobs_count >= 2:
                print("   ✓ Required 2+ jobs available")
                for job in response['jobs']:
                    print(f"     - {job['title']} ({job['id']})")
                return True
            else:
                print("   ❌ Less than 2 jobs found")
                return False
        return success

    def test_specific_job_details(self):
        """Test getting specific job details"""
        # Test with known job IDs from the server.py file
        job_ids = ["ai-engineer-sr", "ai-engineer-ml"]
        all_success = True
        
        for job_id in job_ids:
            success, response = self.run_test(
                f"Job Details ({job_id})",
                "GET",
                f"jobs/{job_id}",
                200
            )
            if success and 'title' in response:
                print(f"   Job Title: {response['title']}")
                print(f"   Location: {response['location']}")
                print(f"   Department: {response['department']}")
            all_success = all_success and success
        
        return all_success

    def test_job_application(self):
        """Test job application with CV upload"""
        # Create a test CV file content
        test_cv_content = b"Test CV Content - This is a mock PDF file for testing purposes."
        
        application_data = {
            'name': 'Test Applicant',
            'email': f'test_applicant_{datetime.now().strftime("%H%M%S")}@example.com',
            'phone': '+1234567890',
            'cover_letter': 'This is a test cover letter for the job application.'
        }
        
        files = {
            'cv': ('test_cv.pdf', test_cv_content, 'application/pdf')
        }
        
        success, response = self.run_test(
            "Job Application with CV",
            "POST",
            "jobs/ai-engineer-sr/apply",
            200,
            data=application_data,
            files=files
        )
        return success

    def test_job_applications_list(self):
        """Test getting job applications for a specific job"""
        return self.run_test("Get Job Applications", "GET", "jobs/ai-engineer-sr/applications", 200)

def main():
    """Run all API tests"""
    print("🚀 Starting Kedorion API Testing Suite")
    print("=" * 60)
    
    tester = KedorionAPITester()
    
    # Run all tests
    test_results = []
    
    # Basic API health
    test_results.append(("API Health", tester.test_api_health()))
    
    # Newsletter tests
    test_results.append(("Newsletter Subscription", tester.test_newsletter_subscription()))
    test_results.append(("Newsletter Subscribers", tester.test_newsletter_subscribers_list()))
    
    # Contact tests
    test_results.append(("Contact Form", tester.test_contact_form()))
    test_results.append(("Contact Messages", tester.test_contact_messages_list()))
    
    # Jobs tests
    test_results.append(("Jobs List", tester.test_jobs_list()))
    test_results.append(("Job Details", tester.test_specific_job_details()))
    test_results.append(("Job Application", tester.test_job_application()))
    test_results.append(("Job Applications List", tester.test_job_applications_list()))
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Results Summary")
    print("=" * 60)
    
    for test_name, passed in test_results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status:<8} {test_name}")
    
    print(f"\n📈 Overall: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"🎯 Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 80:
        print("🎉 Backend API tests mostly successful!")
        return 0
    else:
        print("⚠️  Backend API has significant issues that need attention")
        return 1

if __name__ == "__main__":
    sys.exit(main())