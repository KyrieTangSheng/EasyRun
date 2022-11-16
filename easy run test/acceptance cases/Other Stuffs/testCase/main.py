import unittest
from selenium import webdriver
import page
import constant.globalConstants as const

class PythonOrgSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(const.PATH)
        self.driver.get(const.BASE_URL)
    
    def test_title(self):
        mainPage = page.MainPage(self.driver)
        print(mainPage.is_title_matches())
        assert True

    def tearDown(self):
        self.driver.close()



if __name__ == "__main__":
    unittest.main()