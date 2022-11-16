from selenium import webdriver
import os
import constant.globalConstants as const

class Login(webdriver.Chrome):
    def __init__(self, driver_path = "/chromedriver", teardown = False):
        self.driver_path = driver_path
        self.teardown = teardown
        os.environ['PATH'] += self.driver_path
        super(Login, self).__init__()
        self.implicitly_wait(const.IMPLICIT_WAIT_TIME)
        self.maximize_window()

    def __exit__(self, exc_type, exc_val, exc_tb):
        if (self.teardown):
            self.quit()

    def land_first_page(self):
        self.get(const.BASE_URL)

