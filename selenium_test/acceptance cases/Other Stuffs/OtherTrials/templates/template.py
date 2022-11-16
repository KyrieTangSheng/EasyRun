

import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# sending keys
from selenium.webdriver.common.keys import Keys


# record the file source
os.environ['PATH'] += "mac/Desktop/test"
driver = webdriver.Chrome()

# get the website
driver.get("http://localhost:3000/")


# it will take effect for the whole program, if one find exceed the second it will report error
driver.implicitly_wait(3)

# if some ads appears a way to exit it
try:
    no_button = driver.find_element(By.CSS_SELECTOR, "some filter")
    no_button.click()
finally:
    pass

# test the submit button
my_element = driver.find_element(By.CSS_SELECTOR, "some filter")
my_element.click()

# wait until a specific condition is achieved
WebDriverWait(driver, 5).until(
    EC.text_to_be_present_in_element(
        (By.ID, 'xxx'),
        'coresponding information!'
    )
)

# sending keys to the page
a = driver.find_element(By.CSS_SELECTOR, "some filter")
a.send_keys(Keys.NUMPAD1)

# maintain the web
while(True):
    pass
