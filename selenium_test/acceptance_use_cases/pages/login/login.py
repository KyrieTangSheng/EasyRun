from selenium import webdriver

import constant as const
import parentClass 
# from parentClass import Parent

class Login(parentClass.Parent):
    def __init__(self, url = const.url, teardown = False):
        self.url = url
        super(parentClass.Parent, self).__init__()

    def land_first_page(self):
        self.get(self.url)