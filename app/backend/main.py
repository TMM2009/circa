# trade_graph.py
from collections import defaultdict

class TradeGraph:
    def __init__(self):
        self.user_nodes = {}   # Maps user_id to User object.
        self.edges = defaultdict(list)  # Maps user_id to list of (other_user_id, item_to_give, item_to_receive).
        self.spatial_index = None
        self.item_matcher = None
        self.cache = {}  # Cache for frequently computed trade cycles.

    def set_spatial_index(self, spatial_index):
        self.spatial_index = spatial_index

    def set_item_matcher(self, item_matcher):
        self.item_matcher = item_matcher

    def add_user(self, user):
        """Add a user to the trade graph and register their items."""
        self.user_nodes[user.id] = user
        if self.spatial_index:
            self.spatial_index.add_user(user)
        if self.item_matcher:
            for item in user.items_to_give:
                self.item_matcher.add_item(item, user.id)

    def build_graph_edges(self):
        """Construct graph edges based on potential reciprocal trades between users."""
        self.edges = defaultdict(list)
        for user_id, user in self.user_nodes.items():
            nearby_users = self.spatial_index.find_users_within_radius(*user.location)
            for nearby_user in nearby_users:
                if nearby_user.id == user_id:
                    continue  # Skip self.
                for give_item in user.items_to_give:
                    for want_item in nearby_user.items_to_receive:
                        # Match if the recipient's want is a category match or an item match with similar value.
                        if (isinstance(want_item, str) and want_item == give_item.category) or \
                           (hasattr(want_item, 'category') and want_item.category == give_item.category and
                            abs(want_item.value - give_item.value) <= 0.2 * give_item.value):
                            # Now check if the reverse possibility exists.
                            has_reverse = False
                            for give_item2 in nearby_user.items_to_give:
                                for want_item2 in user.items_to_receive:
                                    if (isinstance(want_item2, str) and want_item2 == give_item2.category) or \
                                       (hasattr(want_item2, 'category') and want_item2.category == give_item2.category and
                                        abs(want_item2.value - give_item2.value) <= 0.2 * give_item2.value):
                                        has_reverse = True
                                        break
                                if has_reverse:
                                    break
                            if has_reverse:
                                self.edges[user_id].append((nearby_user.id, give_item, want_item))

    def find_direct_trades(self):
        """Return a list of user pairs that can directly trade with one another."""
        direct_trades = []
        for user1_id, edges in self.edges.items():
            for user2_id, item1, want1 in edges:
                for potential_match in self.edges.get(user2_id, []):
                    if potential_match[0] == user1_id:
                        direct_trades.append((user1_id, user2_id, item1, potential_match[1]))
                        break
        return direct_trades

    def find_trade_cycles(self, max_length=5):
        """Find cycles (trade chains) in the graph representing multi-user trades."""
        cycles = []
        cache_key = f"cycles_{max_length}"
        if cache_key in self.cache:
            return self.cache[cache_key]

        def dfs(current, path, seen, start_node):
            if current == start_node and len(path) > 0:
                # Validate cycle: every step must have a valid edge.
                if all(any(next_id == path[(i+1) % len(path)] for next_id, _, _ in self.edges[path[i]])
                       for i in range(len(path))):
                    cycles.append(path.copy())
                return

            if len(path) >= max_length or current in seen:
                return

            seen.add(current)
            path.append(current)
            for next_id, _, _ in self.edges[current]:
                dfs(next_id, path, seen.copy(), start_node)
            path.pop()
            seen.remove(current)

        for user_id in self.user_nodes:
            dfs(user_id, [], set(), user_id)

        # Normalize cycles to remove duplicates.
        unique_cycles = []
        cycle_sets = set()
        for cycle in cycles:
            min_idx = cycle.index(min(cycle))
            normalized = tuple(cycle[min_idx:] + cycle[:min_idx])
            if normalized not in cycle_sets:
                cycle_sets.add(normalized)
                unique_cycles.append(cycle)
        self.cache[cache_key] = unique_cycles
        return unique_cycles

    def optimize_trade_cycle(self, cycle):
        """Attempt to shorten a trade cycle by removing redundant nodes while keeping it valid."""
        i = 0
        while i < len(cycle) and len(cycle) > 3:
            user1 = cycle[i]
            user3 = cycle[(i+2) % len(cycle)]
            can_trade = any(next_id == user3 for next_id, _, _ in self.edges[user1])
            if can_trade:
                # Remove the middle node.
                cycle.remove(cycle[(i+1) % len(cycle)])
            else:
                i += 1
        return cycle

    def execute_trade_cycle(self, cycle):
        """
        Execute a trade cycle by updating users’ inventories.
        For each user in the cycle, select the best matching item to trade to the next user.
        """
        trade_items = []
        for i in range(len(cycle)):
            giver_id = cycle[i]
            receiver_id = cycle[(i+1) % len(cycle)]
            giver = self.user_nodes[giver_id]
            receiver = self.user_nodes[receiver_id]
            best_item = None
            best_match = None
            best_diff = float('inf')
            for item in giver.items_to_give:
                for want in receiver.items_to_receive:
                    if (isinstance(want, str) and want == item.category) or \
                       (hasattr(want, 'category') and want.category == item.category and
                        abs(want.value - item.value) <= 0.2 * item.value):
                        diff = abs(item.value - (want.value if hasattr(want, 'value') else item.value))
                        if diff < best_diff:
                            best_diff = diff
                            best_item = item
                            best_match = want
            if best_item:
                trade_items.append((giver_id, receiver_id, best_item.id))
                giver.remove_item_to_give(best_item.id)
                if isinstance(best_match, str):
                    receiver.remove_item_to_receive(best_match)
                else:
                    receiver.remove_item_to_receive(best_match.id)
        return trade_items
