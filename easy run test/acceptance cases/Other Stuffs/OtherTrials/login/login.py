import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
# import constant.globalConstants as const


# record the file source
os.environ['PATH'] += "mac/Desktop/test"
driver = webdriver.Chrome()

# get the website
driver.get("http://localhost:3000/login")

# it will take effect for the whole program, if one find exceed the second it will report error
driver.implicitly_wait(3)
# test the submit button
my_element = driver.find_element(By.CSS_SELECTOR, "form > button[type='submit']")
my_element.click()

# wait until a specific condition is achieved
WebDriverWait(driver, 5).until(
    EC.text_to_be_present_in_element(
        (By.ID, 'email-helper-text'),
        'Please enter your email address'
    )
)

a = driver.find_element(By.ID, "email")
a.send_keys(Keys.NUMPAD1)

# maintain the web
# while(True):
#     pass
