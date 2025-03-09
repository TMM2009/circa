# item_matcher.py
from collections import defaultdict
from threading import Lock

class ItemMatcher:
    def __init__(self):
        self.items_by_category = defaultdict(list)
        self.items_by_value_range = defaultdict(list)
        self.lock = Lock()

    def add_item(self, item, user_id):
        with self.lock:
            self.items_by_category[item.category].append((item, user_id))
            # Create value buckets (e.g., $0-10, $10-20, etc.)
            value_bucket = (int(item.value) // 10) * 10 if item.value is not None else 0
            self.items_by_value_range[value_bucket].append((item, user_id))

    def find_matching_items(self, want_item, tolerance=0.2):
        """
        Find items that match the requested item.
         - If want_item is a category (string), return all items in that category.
         - If want_item is an Item, return items in the same category whose values are within tolerance.
        """
        with self.lock:
            if isinstance(want_item, str):
                return self.items_by_category.get(want_item, [])
            else:
                category_matches = self.items_by_category.get(want_item.category, [])
                value_min = want_item.value * (1 - tolerance)
                value_max = want_item.value * (1 + tolerance)
                return [(item, user_id) for item, user_id in category_matches
                        if item.value is not None and value_min <= item.value <= value_max]
