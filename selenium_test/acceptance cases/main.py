from pages.login.login import Login


with Login() as bot:
    bot.land_first_page()
    print(bot.teardown)
    print("Exiting...")