class HorizontalScaling:
    def __init__(self, min_instances=1, max_instances=10):
        self.min_instances = min_instances
        self.max_instances = max_instances
        self.current_instances = min_instances

    def scale_up(self):
        if self.current_instances < self.max_instances:
            self.current_instances += 1
            print(f"Scaled up to {self.current_instances} instances.")
        else:
            print("Already at maximum instances.")

    def scale_down(self):
        if self.current_instances > self.min_instances:
            self.current_instances -= 1
            print(f"Scaled down to {self.current_instances} instances.")
        else:
            print("Already at minimum instances.")

# Example usage
if __name__ == '__main__':
    scaling = HorizontalScaling()
    scaling.scale_up()
    scaling.scale_down()