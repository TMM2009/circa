# main.py
from flask import Flask, request, jsonify
from models import User, Item
from spatial_index import SpatialIndex
from item_matcher import ItemMatcher
from trade_graph import TradeGraph
from trade_service import TradeMatchingService

app = Flask(__name__)

# Initialize the core components.
spatial_index = SpatialIndex()
item_matcher = ItemMatcher()
trade_graph = TradeGraph()
trade_graph.set_spatial_index(spatial_index)
trade_graph.set_item_matcher(item_matcher)
trade_service = TradeMatchingService(trade_graph)

# Endpoint to add a new user.
@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.json
    user = User(data["id"], data["name"], data["latitude"], data["longitude"])

    # Add offered items.
    for item_data in data.get("items_to_give", []):
        item = Item(
            item_id=item_data["id"],
            name=item_data["name"],
            category=item_data["category"],
            value=item_data.get("value", 0)
        )
        user.add_item_to_give(item)

    # Add desired items (can be a category string or an item spec).
    for want in data.get("items_to_receive", []):
        user.add_item_to_receive(want)

    trade_graph.add_user(user)
    return jsonify({"status": "User added successfully."})

# Endpoint to view current trade matches.
@app.route("/match_trades", methods=["GET"])
def match_trades():
    trade_service.update_graph()
    direct = trade_service.get_direct_trades()
    cycles = trade_service.get_trade_cycles()
    return jsonify({
        "direct_trades": direct,
        "trade_cycles": cycles
    })

# Endpoint to execute trades.
@app.route("/execute_trades", methods=["POST"])
def execute_trades():
    trade_service.update_graph()
    result = trade_service.execute_trades()
    return jsonify(result)

# Endpoint to evaluate an item's value.
@app.route("/evaluate_item", methods=["POST"])
def evaluate_item():
    data = request.json
    item = Item(
        item_id=data["id"],
        name=data["name"],
        category=data["category"],
        value=data.get("value", 0)
    )
    evaluated_value = trade_service.evaluate_item_value(item)
    return jsonify({"evaluated_value": evaluated_value})

if __name__ == "__main__":
    app.run(debug=True)
