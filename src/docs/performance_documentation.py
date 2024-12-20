# PerformanceDocumentation.py
# This module provides documentation on performance optimization strategies and testing procedures.

class PerformanceDocumentation:
    """
    A class that encapsulates performance optimization strategies and testing procedures
    for the application.
    """

    def __init__(self):
        self.optimization_strategies = []
        self.testing_procedures = []

    def add_optimization_strategy(self, strategy):
        """
        Add a performance optimization strategy to the documentation.
        :param strategy: A string describing the optimization strategy.
        """
        self.optimization_strategies.append(strategy)

    def add_testing_procedure(self, procedure):
        """
        Add a testing procedure to the documentation.
        :param procedure: A string describing the testing procedure.
        """
        self.testing_procedures.append(procedure)

    def generate_documentation(self):
        """
        Generate the performance documentation as a string.
        """
        doc = """
        Performance Optimization Strategies:
        ---------------------------
        """
        for strategy in self.optimization_strategies:
            doc += f"- {strategy}
"

        doc += """
        
Testing Procedures:
        ---------------------------
        """
        for procedure in self.testing_procedures:
            doc += f"- {procedure}
"

        return doc
