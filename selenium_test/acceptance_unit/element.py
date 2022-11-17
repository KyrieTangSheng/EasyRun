from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

import constants as const

class BasePageElementText(object):

    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, const.Text_WAIT).until(
            lambda driver: driver.find_element(By.CSS_SELECTOR, self.locator))
        driver.find_element(By.CSS_SELECTOR, self.locator).clear()
        driver.find_element(By.CSS_SELECTOR, self.locator).send_keys(value)

    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, const.Text_WAIT).until(
            lambda driver: driver.find_element(By.CSS_SELECTOR, self.locator))
        
        element = driver.find_element(By.CSS_SELECTOR, self.locator)

        return element.get_attribute("value")

class BasePageElementButton(object):
    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, const.Text_WAIT).until(
            lambda driver: driver.find_element(By.CSS_SELECTOR, self.locator))
        driver.find_element(By.CSS_SELECTOR, self.locator).clear()
        driver.find_element(By.CSS_SELECTOR, self.locator).send_keys(value)

    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, const.Text_WAIT).until(
            lambda driver: driver.find_element(By.CSS_SELECTOR, self.locator))
        
        element = driver.find_element(By.CSS_SELECTOR, self.locator)

        return element.get_attribute("value")