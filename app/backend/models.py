# models.py

class Item:
    def __init__(self, item_id: int, name: str, category: str, value: float = 0.0):
        self.id = item_id
        self.name = name
        self.category = category
        self.value = value  # Estimated value; if not provided, it can be evaluated later.

class User:
    def __init__(self, user_id: int, name: str, latitude: float, longitude: float):
        self.id = user_id
        self.name = name
        self.location = (latitude, longitude)
        self.items_to_give = []       # List of Item objects the user is offering.
        self.items_to_receive = []    # List of Item objects or category strings the user wants.

    def add_item_to_give(self, item: Item):
        self.items_to_give.append(item)

    def add_item_to_receive(self, item_or_category):
        self.items_to_receive.append(item_or_category)

    def remove_item_to_give(self, item_id: int):
        self.items_to_give = [item for item in self.items_to_give if item.id != item_id]

    def remove_item_to_receive(self, item_id_or_category):
        if isinstance(item_id_or_category, str):
            self.items_to_receive = [
                want for want in self.items_to_receive
                if not (isinstance(want, str) and want == item_id_or_category)
            ]
        else:
            self.items_to_receive = [
                want for want in self.items_to_receive
                if not (isinstance(want, Item) and want.id == item_id_or_category)
            ]
