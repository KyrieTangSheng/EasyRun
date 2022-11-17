from locators import *
from element import BasePageElementText
from Pages.parent import BasePage
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import constants as const

class IndexPage(BasePage):

    def click_institution_button(self):
        institution_button = self.driver.find_element(By.CSS_SELECTOR, const.INSTITUTION_BUTTON)
        institution_button.click()
        # print(self.check_current_url)
        return self.check_current_url == const.INSTITUTION_URL
    
    def click_program_button(self):
        program_button = self.driver.find_element(By.CSS_SELECTOR, const.PROGRAM_BUTTON)
        program_button.click()
        # print(self.check_current_url)
        return self.check_current_url == const.PROGRAM_URL

    def click_icon(self):
        print('select')
        icon_button = self.driver.find_element(By.LINK_TEXT, 'EasyRun')
        icon_button.Click()
        print(icon_button)
        print('clicks')
        print(self.check_current_url())
        WebDriverWait(self.driver, const.REDIRECT).until(
            self.check_current_url == const.LOGIN_URL

        )
        return self.check_current_url == const.LOGIN_URL

    
    def click_image(self):
        print('select')
        icon_button = self.driver.find_element(By.LINK_TEXT, 'EasyRun')
        icon_button.Click()
        print(icon_button)
        print('clicks')
        print(self.check_current_url())
        WebDriverWait(self.driver, const.REDIRECT).until(
            self.check_current_url == const.LOGIN_URL

        )
        return self.check_current_url == const.LOGIN_URL
    
    
        