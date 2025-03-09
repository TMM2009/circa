# trade_service.py
from trade_graph import TradeGraph
import concurrent.futures

class TradeMatchingService:
    def __init__(self, trade_graph: TradeGraph):
        self.trade_graph = trade_graph

    def update_graph(self):
        """Rebuild the graph edges based on the current users and their items."""
        self.trade_graph.build_graph_edges()

    def get_direct_trades(self):
        """Return direct trade matches."""
        return self.trade_graph.find_direct_trades()

    def get_trade_cycles(self, max_length=5):
        """Return trade cycles (multi-hop trades) found in the graph."""
        return self.trade_graph.find_trade_cycles(max_length)

    def execute_trades(self):
        """Execute both direct trades and multi-hop (cycle) trades, updating inventories accordingly."""
        direct_trades = self.get_direct_trades()
        cycle_trades = []
        trade_cycles = self.get_trade_cycles()
        for cycle in trade_cycles:
            optimized_cycle = self.trade_graph.optimize_trade_cycle(cycle)
            executed = self.trade_graph.execute_trade_cycle(optimized_cycle)
            cycle_trades.extend(executed)
        return {
            "direct_trades": direct_trades,
            "cycle_trades": cycle_trades
        }

    def evaluate_item_value(self, item):
        """
        Evaluate an item's value using an improved method.
        Instead of (or in addition to) web scraping, you could integrate market data APIs or historical pricing.
        Here we simulate an evaluation: if no value is set, assign a base value and adjust by category.
        """
        if item.value is not None and item.value > 0:
            return item.value

        base_value = 50.0  # Base value as a fallback.
        category_multiplier = {
            "electronics": 1.5,
            "furniture": 1.2,
            "clothing": 1.0,
            "books": 0.8
        }
        multiplier = category_multiplier.get(item.category.lower(), 1.0)
        evaluated_value = base_value * multiplier
        item.value = evaluated_value
        return evaluated_value
