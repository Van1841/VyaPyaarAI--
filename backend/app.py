# flask based backend api hai yeh
from flask import Flask, request, jsonify
# flask for making app 
# req frontend se data lene ke liye
# jsonify for returning json response
from flask_cors import CORS
# Ye allow karta hai Cross-Origin Requests — yani tu frontend (e.g. React app) se backend Flask API ko call kar sakta hai without CORS errors.
from meesho_scraper import scrape_meesho_prices

app = Flask(__name__)
# flask app banaya __name__ => file directly run ho and app bane
CORS(app)

@app.route("/api/scrape-prices", methods=["POST"])
def get_prices():
    data = request.get_json()
    # request se data lete hain jo frontend se aaya hai in json format krdia phir
    product_name = data.get("productName", "")

    if not product_name:
        return jsonify({"error": "Missing product name"}), 400

# scraping call of that particular product 
    prices = scrape_meesho_prices(product_name)
    return jsonify(prices)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

# Jab ye file direct run hoti hai tab:

# Flask app run hoga on port 5000

# debug=True ➝ changes auto reload honge aur error details dikhenge.