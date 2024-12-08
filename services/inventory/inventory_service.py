class InventoryItem:
    def __init__(self, item_id, name, quantity):
        self.item_id = item_id
        self.name = name
        self.quantity = quantity

class Inventory:
    def __init__(self):
        self.items = {}  # Dictionary for fast lookup

    def add_item(self, item_id, name, quantity):
        if item_id not in self.items:
            new_item = InventoryItem(item_id, name, quantity)
            self.items[item_id] = new_item
        else:
            self.items[item_id].quantity += quantity  # Update quantity if item already exists

    def get_item(self, item_id):
        return self.items.get(item_id, None)