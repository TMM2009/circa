class ItemMatcher:
    def __init__(self):
        self.items_by_category = defaultdict(list)
        self.items_by_value_range = defaultdict(list)
        self.lock = Lock()

    def add_item(self, item, user_id):
        with self.lock:
            self.items_by_category[item.category].append((item, user_id))

            # Create value buckets (e.g., $0-10, $10-20, etc.)
            value_bucket = item.value // 10 * 10
            self.items_by_value_range[value_bucket].append((item, user_id))

    def find_matching_items(self, want_item, tolerance=0.2):
        """Find items that match the requested item (by category and similar value)"""
        with self.lock:
            matches = []

            if isinstance(want_item, str):  # It's a category
                category_matches = self.items_by_category.get(want_item, [])
                return category_matches
            else:  # It's an Item object
                category_matches = self.items_by_category.get(want_item.category, [])

                # Filter by value within tolerance
                value_min = want_item.value * (1 - tolerance)
                value_max = want_item.value * (1 + tolerance)

                return [(item, user_id) for item, user_id in category_matches
                        if value_min <= item.value <= value_max]
