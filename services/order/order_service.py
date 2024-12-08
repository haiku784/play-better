class Order:
    def __init__(self, order_id, user_id, items):
        self.order_id = order_id
        self.user_id = user_id
        self.items = items

class OrderService:
    def __init__(self):
        self.orders = []

    def create_order(self, user_id, items):
        order_id = len(self.orders) + 1
        new_order = Order(order_id, user_id, items)
        self.orders.append(new_order)
        return new_order

    def get_user_orders(self, user_id):
        return [order for order in self.orders if order.user_id == user_id]