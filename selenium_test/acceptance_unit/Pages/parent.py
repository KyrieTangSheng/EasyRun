# the base function that all pages all check

class BasePage(object):
    def __init__(self, driver):
        self.driver = driver
    
    # check the title of the app
    def check_title(self):
        return self.driver.title
    
    # check current URL
    def check_current_url(self):
        return self.getCurrentUrl()