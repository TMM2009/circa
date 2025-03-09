from collections import defaultdict

class TradeGraph:
    def __init__(self):
        self.user_nodes = {}  # Map user_id to User object
        self.edges = defaultdict(list)  # Map user_id to list of (user_id, item_to_give, item_to_receive) tuples
        self.spatial_index = None
        self.item_matcher = None
        self.cache = {}  # Cache for frequent trade patterns

    def set_spatial_index(self, spatial_index):
        self.spatial_index = spatial_index

    def set_item_matcher(self, item_matcher):
        self.item_matcher = item_matcher

    def add_user(self, user):
        """Add a user to the trade graph"""
        self.user_nodes[user.id] = user
        if self.spatial_index:
            self.spatial_index.add_user(user)

        # Add user's items to the item matcher
        if self.item_matcher:
            for item in user.items_to_give:
                self.item_matcher.add_item(item, user.id)

    def build_graph_edges(self):
        """Construct the graph edges based on potential trades"""
        self.edges = defaultdict(list)

        # For each user
        for user_id, user in self.user_nodes.items():
            # Find nearby users
            nearby_users = self.spatial_index.find_users_within_radius(*user.location)

            for nearby_user in nearby_users:
                if nearby_user.id == user_id:
                    continue  # Skip self

                # Check if user1 has items user2 wants and vice versa
                for give_item in user.items_to_give:
                    for want_item in nearby_user.items_to_receive:
                        # Check if the items match
                        if (isinstance(want_item, str) and want_item == give_item.category) or \
                           (hasattr(want_item, 'category') and want_item.category == give_item.category and \
                            abs(want_item.value - give_item.value) <= 0.2 * give_item.value):

                            # Check reverse direction
                            has_reverse = False
                            for give_item2 in nearby_user.items_to_give:
                                for want_item2 in user.items_to_receive:
                                    if (isinstance(want_item2, str) and want_item2 == give_item2.category) or \
                                       (hasattr(want_item2, 'category') and want_item2.category == give_item2.category and \
                                        abs(want_item2.value - give_item2.value) <= 0.2 * give_item2.value):
                                        has_reverse = True
                                        break
                                if has_reverse:
                                    break

                            if has_reverse:
                                # Add edge if reciprocal trade exists
                                self.edges[user_id].append((nearby_user.id, give_item, want_item))

    def find_direct_trades(self):
        """Find pairs of users who can trade directly with each other"""
        direct_trades = []

        for user1_id, edges in self.edges.items():
            for user2_id, item1, want1 in edges:
                # Check if there's a reciprocal edge
                for potential_match in self.edges[user2_id]:
                    if potential_match[0] == user1_id:
                        direct_trades.append((user1_id, user2_id, item1, potential_match[1]))
                        break

        return direct_trades

    def find_trade_cycles(self, max_length=5):
        """Find cycles in the graph that represent viable trade chains"""
        cycles = []

        # Check the cache first
        cache_key = f"cycles_{max_length}"
        if cache_key in self.cache:
            return self.cache[cache_key]

        def dfs(current, path, seen, start_node):
            # If we returned to start and path is not trivial
            if current == start_node and len(path) > 1:
                # Verify it's a valid trade cycle
                is_valid = True
                for i in range(len(path)):
                    giver = path[i]
                    receiver = path[(i+1) % len(path)]

                    # Check if there's a valid edge
                    valid_edge = False
                    for next_id, item, want in self.edges[giver]:
                        if next_id == receiver:
                            valid_edge = True
                            break

                    if not valid_edge:
                        is_valid = False
                        break

                if is_valid:
                    cycles.append(path[:])
                return

            # If we reached max length or already visited
            if len(path) >= max_length or current in seen:
                return

            seen.add(current)
            path.append(current)

            for next_id, _, _ in self.edges[current]:
                dfs(next_id, path, seen.copy(), start_node)

            path.pop()
            seen.remove(current)

        # Start DFS from each node
        for user_id in self.user_nodes:
            dfs(user_id, [], set(), user_id)

        # Prune redundant cycles (same cycle with different starting points)
        unique_cycles = []
        cycle_sets = set()

        for cycle in cycles:
            # Normalize cycle by starting with the minimum user_id
            min_idx = cycle.index(min(cycle))
            normalized = cycle[min_idx:] + cycle[:min_idx]
            cycle_tuple = tuple(normalized)

            if cycle_tuple not in cycle_sets:
                cycle_sets.add(cycle_tuple)
                unique_cycles.append(cycle)

        # Cache the result
        self.cache[cache_key] = unique_cycles
        return unique_cycles

    def optimize_trade_cycle(self, cycle):
        """Optimize a trade cycle by removing redundant nodes if possible"""
        # Check if we can reduce the cycle
        i = 0
        while i < len(cycle) and len(cycle) > 3:  # Don't reduce below 3 nodes
            user1 = cycle[i]
            user3 = cycle[(i+2) % len(cycle)]

            # Check if user1 can trade directly with user3
            can_trade = False
            for next_id, _, _ in self.edges[user1]:
                if next_id == user3:
                    can_trade = True
                    break

            if can_trade:
                # Remove the middle node
                user2 = cycle[(i+1) % len(cycle)]
                cycle.remove(user2)
            else:
                i += 1

        return cycle

    def execute_trade_cycle(self, cycle):
        """Execute a trade cycle by updating user inventories"""
        trade_items = []

        # For each user in the cycle, determine what they give to the next user
        for i in range(len(cycle)):
            giver_id = cycle[i]
            receiver_id = cycle[(i+1) % len(cycle)]

            giver = self.user_nodes[giver_id]
            receiver = self.user_nodes[receiver_id]

            # Find a matching item to trade
            best_item = None
            best_match = None

            for item in giver.items_to_give:
                for want in receiver.items_to_receive:
                    if (isinstance(want, str) and want == item.category) or \
                       (hasattr(want, 'category') and want.category == item.category and \
                        abs(want.value - item.value) <= 0.2 * item.value):

                        if best_item is None or abs(item.value - (want.value if hasattr(want, 'value') else item.value)) < \
                           abs(best_item.value - (best_match.value if hasattr(best_match, 'value') else best_item.value)):
                            best_item = item
                            best_match = want

            if best_item:
                trade_items.append((giver_id, receiver_id, best_item.id))
                # Remove items from users' lists
                giver.remove_item_to_give(best_item.id)
                receiver.remove_item_to_receive(best_match if isinstance(best_match, str) else best_match.id)

        return trade_items
