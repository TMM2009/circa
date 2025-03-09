import math

class Item:
    def __init__(self, item_id, name, category, value):
        self.id = item_id
        self.name = name
        self.category = category
        self.value = value  # Estimated value

class User:
    def __init__(self, user_id, name, latitude, longitude):
        self.id = user_id
        self.name = name
        self.location = (latitude, longitude)
        self.items_to_give = []  # List of Item objects
        self.items_to_receive = []  # List of Item objects or categories

    def add_item_to_give(self, item):
        self.items_to_give.append(item)

    def add_item_to_receive(self, item_or_category):
        self.items_to_receive.append(item_or_category)

    def remove_item_to_give(self, item_id):
        self.items_to_give = [item for item in self.items_to_give if item.id != item_id]

    def remove_item_to_receive(self, item_id_or_category):
        if isinstance(item_id_or_category, str):
            # It's a category
            self.items_to_receive = [item for item in self.items_to_receive
                                   if not (isinstance(item, str) and item == item_id_or_category)]
        else:
            # It's an item ID
            self.items_to_receive = [item for item in self.items_to_receive
                                   if not (hasattr(item, 'id') and item.id == item_id_or_category)]
