# selenium use kra --> no. of items scraped was 20 something and was slow.
import undetected_chromedriver as uc
# ka use hota hai taaki website ko pata na chale ki Selenium use ho raha hai (bot detection avoid karne ke liye).
from selenium.webdriver.common.by import By
# Yeh By class use hoti hai to specify kis tarah se element dhoondhna hai — jaise by ID, TAG_NAME, etc.
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException
import time


def scrape_meesho_prices(product_name):
    options = uc.ChromeOptions()
    # Ye sab options browser ko optimize aur fake user-agent set karne ke liye — website ko ye lage ki real user hai.
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

    driver = uc.Chrome(options=options)

    try:
        driver.get("https://www.meesho.com/")
        wait = WebDriverWait(driver, 15)

        # Wait for the search input box and enter the product name
        search_input = wait.until(EC.presence_of_element_located((By.TAG_NAME, "input")))
        search_input.send_keys(product_name)
        search_input.send_keys(Keys.ENTER)

        # Wait a bit to ensure results load
        time.sleep(5)

        prices = []
        # collects all h5 tags bc prices are usually in those tags
        price_elements = driver.find_elements(By.TAG_NAME, "h5")

        for i in range(len(price_elements)):
            try:
                el = price_elements[i]
                text = el.text.strip()
                if "₹" in text:
                    amount = text.replace("₹", "").replace(",", "").strip()
                    if amount.isdigit():
                        prices.append(int(amount))
            except StaleElementReferenceException:
                # Re-fetch element if stale(purana / outdated / invalid)
                el = driver.find_elements(By.TAG_NAME, "h5")[i]
                text = el.text.strip()
                if "₹" in text:
                    amount = text.replace("₹", "").replace(",", "").strip()
                    if amount.isdigit():
                        prices.append(int(amount))

        try:
            driver.quit()
        except:
            pass

        if not prices:
            return {"error": "No prices found"}

        return {
            "min": min(prices),
            "max": max(prices),
            "avg": sum(prices) // len(prices),
            "count": len(prices),
        }

    except Exception as e:
        try:
            driver.quit()
        except:
            pass
        return {"error": str(e)}
