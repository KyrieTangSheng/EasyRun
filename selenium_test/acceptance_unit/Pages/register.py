from locators import *
from element import BasePageElementText
from Pages.parent import BasePage
import constants as const

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class EmailTextInput(BasePageElementText):
    locator = ""

class LoginPage(BasePage):
    def click_submit(self):
        my_element = self.driver.find_element(By.CSS_SELECTOR, "form > button[type='submit']")
        my_element.click()
    
    def check_email_empty(self):
        my_element = self.driver.find_element(By.ID, 'email-helper-text')
        return my_element.text == 'Please enter your email address'

    def check_email_invalid(self):
        my_element = self.driver.find_element(By.ID, 'email-helper-text')
        return my_element.text == 'Please enter a valid email address'

    def check_password(self):
        my_element = self.driver.find_element(By.ID, 'password-helper-text')
        return my_element.text == 'Please enter your password'
    
    def check_type(self):
        my_element = self.driver.find_element(By.ID, 'outlined-select-role-helper-text')
        return my_element.text == 'Please enter your user type'

    def click_empty(self):
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'email-helper-text'),
            'Please enter your email address'
            )
        )
        return self.check_email_empty() & self.check_password() & self.check_type

    def click_with_incomplete_email(self):
        a = self.driver.find_element(By.ID, "email")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'email-helper-text'),
            'Please enter a valid email address'
            )
        )

        return self.check_email_invalid() & self.check_password() & self.check_type
    
    def click_with_complete_email(self):
        a = self.driver.find_element(By.ID, "email")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        a.send_keys(Keys.LEFT_ALT, Keys.NUMPAD2)
        a.send_keys(Keys.DECIMAL)
        a.send_keys(Keys.C)
        a.send_keys(Keys.O)
        a.send_keys(Keys.M) 
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'password-helper-text'),
            'Please enter your password'
            )
        )
        return self.check_password() & self.check_type
    

    def click_with_no_type(self):
        a = self.driver.find_element(By.ID, "password")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        a.send_keys(Keys.NUMPAD2)
        a.send_keys(Keys.NUMPAD3)
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'outlined-select-role-helper-text'),
            'Please enter your user type'
            )
        )
        return self.check_type
    
    def click_with_incosistant_password(self):
        a = self.driver.find_element(By.ID, "password")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        a.send_keys(Keys.NUMPAD2)
        a.send_keys(Keys.NUMPAD3)

        c = self.driver.find_element(By.ID, "confirmed-password")
        c.clear()
        c.send_keys(Keys.NUMPAD1)
        c.send_keys(Keys.NUMPAD2)
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'outlined-select-role-helper-text'),
            'Please enter your user type'
            )
        )
        return self.check_current_url == const.HOME_URL
    

    def repeat_email(self):
        b = self.driver.find_element(By.ID, "email")
        b.clear()
        b.send_keys(Keys.NUMPAD1)
        b.send_keys(Keys.LEFT_ALT, Keys.NUMPAD2)
        b.send_keys(Keys.DECIMAL)
        b.send_keys(Keys.C)
        b.send_keys(Keys.O)
        b.send_keys(Keys.M) 

        a = self.driver.find_element(By.ID, "password")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        a.send_keys(Keys.NUMPAD2)
        a.send_keys(Keys.NUMPAD3)
    
        c = self.driver.find_element(By.ID, "confirmed-password")
        a.clear()
        a.send_keys(Keys.NUMPAD1)
        a.send_keys(Keys.NUMPAD2)
        a.send_keys(Keys.NUMPAD3)
        self.click_submit()
        WebDriverWait(self.driver, 5).until(
            EC.text_to_be_present_in_element(
            (By.ID, 'outlined-select-role-helper-text'),
            'PPlease enter your user type'
            )
        )
        return self.check_current_url == const.HOME_URL
