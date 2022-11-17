import unittest
from selenium import webdriver
import os

import constants as const
import Pages as page
import warnings

class AcceptanceTest(unittest.TestCase):
    def setUp(self):
        warnings.simplefilter('ignore', ResourceWarning)
        os.environ['PATH'] += const.PATH
        self.driver = webdriver.Chrome()
        self.driver.get(const.BASE_URL)
        self.driver.implicitly_wait(const.IMPLICIT_WAIT_TIME)
        print("Start Testing")
        print("################################################################")

    def form(self, cuing_msg, sub, func):
        print(cuing_msg)
        print("------------")
        try:
            assert sub.func()
            print("SUCCESS")
        except:
            print("FAIL")
        
    def test_index(self):
        print("Start Testing Index Page")
        print("-----------------------------------------------------------------")
        indexPage = page.IndexPage(self.driver)
        # test insitution button
        print("Click Institution Button")
        try:
            self.assertTrue(indexPage.click_institution_button())
            print("SUCCESS")
        except: 
            print("FAIL")

        # test program button
        print("Click Program Button")
        try:
            assert indexPage.click_program_button()
            print("SUCCESS")
        except: 
            print("FAIL")
        
        # test program button
        print("Click Icon Button")
        try:
            self.assertTrue(indexPage.click_icon())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("-----------------------------------------------------------------")
        print("Ending Test Index Page")

    def test_login(self):
        print("Start Testing Login")
        print("-----------------------------------------------------------------")
        self.driver.get(const.LOGIN_URL)
        loginPage = page.LoginPage(self.driver)

        print("Submit Without Filling")
        try:
            assert loginPage.click_empty()
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with Wrong Email")

        try:
            assert loginPage.click_with_incomplete_email()
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with Email")

        try:
            assert loginPage.click_with_complete_email()
            print("SUCCESS")
        except: 
            print("FAIL")

        print()

        print("Submit with Correct Password")

        try:
            assert loginPage.click_with_wrong_password()
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Correct Way")

        try:
            assert loginPage.cl()
            print("SUCCESS")
        except: 
            print("FAIL")



        print("Ending Test Login")

    def test_register(self):
        print("Start Testing Register")
        print("-----------------------------------------------------------------")
        self.driver.get(const.REGISTER_URL)
        registerPage = page.Register(self.driver)

        print("Submit Without Filling")
        try:
            self.assertTrue(registerPage.click_institution_button())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with incomplete Email")
        try:
            self.assertTrue(registerPage.click_with_incomplete_email())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with only complete email")
        try:
            self.assertTrue(registerPage.click_with_complete_email())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with Empty Password")
        try:
            self.assertTrue(registerPage.click_with_no_type())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with Inconstant Password")
        try:
            self.assertTrue(registerPage.click_with_inconsistent_password())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Submit with Repetitive Email")
        try:
            self.assertTrue(registerPage.repeat_email())
            print("SUCCESS")
        except: 
            print("FAIL")

        print("Ending Test Login")

    def tearDown(self):
        # print("-----------------------------------------------------------------")
        # print("End test")
        self.driver.close()

if __name__ == "__main__":

    unittest.main()
