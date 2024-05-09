# quantum_main.py
from qiskit import QuantumCircuit, transpile, assemble, Aer, execute
from quantum_algorithms import grover, quantum_counting

# Define the number of qubits
n = 5

# Define the oracle for counting the marked items
def counting_oracle(circuit):
    circuit.z(0)
    circuit.cx(0, 1)
    circuit.cx(1, 2)
    circuit.cx(2, 3)
    circuit.cx(3, 4)
    circuit.z(0)

# Create a quantum circuit with n qubits
circuit = QuantumCircuit(n)

# Apply Grover's algorithm to find the marked item
grover(circuit, counting_oracle)

# Measure the output
circuit.measure_all()

# Run the circuit on a simulator
simulator = Aer.get_backend('qasm_simulator')
job = execute(circuit, simulator)
result = job.result()

# Get the counts
counts = result.get_counts()

# Print the counts
print(counts)

# Apply the quantum counting algorithm
quantum_counting(circuit, counting_oracle)

# Measure the output
circuit.measure_all()

# Run the circuit on a simulator
simulator = Aer.get_backend('qasm_simulator')
job = execute(circuit, simulator)
result = job.result()

# Get the counts
counts = result.get_counts()

# Print the counts
print(counts)
