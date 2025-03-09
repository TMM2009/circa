# spatial_index.py
import math
from scipy.spatial import KDTree
from threading import Lock

class SpatialIndex:
    def __init__(self):
        self.users = []
        self.locations = []
        self.kdtree = None
        self.lock = Lock()

    def add_user(self, user):
        with self.lock:
            self.users.append(user)
            self.locations.append(user.location)
            self.kdtree = None  # Invalidate the KDTree

    def remove_user(self, user_id):
        with self.lock:
            idx = next((i for i, user in enumerate(self.users) if user.id == user_id), None)
            if idx is not None:
                self.users.pop(idx)
                self.locations.pop(idx)
                self.kdtree = None  # Invalidate the KDTree

    def build_index(self):
        with self.lock:
            if self.locations:
                self.kdtree = KDTree(self.locations)

    def find_users_within_radius(self, latitude, longitude, radius_miles=15):
        with self.lock:
            if self.kdtree is None:
                self.build_index()
            if self.kdtree is None:  # No users available
                return []

            # Approximate conversion: 1 degree ≈ 69 miles.
            radius_deg = radius_miles / 69.0

            # Query the KDTree to get indices within the radius.
            indices = self.kdtree.query_ball_point([latitude, longitude], radius_deg, p=2)
            return [self.users[i] for i in indices]
