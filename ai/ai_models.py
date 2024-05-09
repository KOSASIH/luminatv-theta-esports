# ai_models.py
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

class PlayerPerformanceModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(PlayerPerformanceModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim) 
        self.fc2 = nn.Linear(hidden_dim, output_dim) 

    def forward(self, x):
        x = torch.relu(self.fc1(x)) 
        x = self.fc2(x)
        return x

class GameOutcomeModel(RandomForestRegressor):
    def __init__(self, n_estimators=100, random_state=42):
        super(GameOutcomeModel, self).__init__(n_estimators=n_estimators, random_state=random_state)

class MetricModel(LinearRegression):
    def __init__(self):
        super(MetricModel, self).__init__()

def load_data(file_path):
    data = pd.read_csv(file_path)
    X = data.drop(['player_id', 'game_id', 'outcome'], axis=1)
    y = data['outcome']
    return X, y

def preprocess_data(X, y):
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, y

def train_player_performance_model(X, y, epochs=100, batch_size=32):
    model = PlayerPerformanceModel(input_dim=X.shape[1], hidden_dim=128, output_dim=1)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    for epoch in range(epochs):
        for i in range(0, len(X), batch_size):
            x_batch = X[i:i+batch_size]
            y_batch = y[i:i+batch_size]
            optimizer.zero_grad()
            outputs = model(x_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            optimizer.step()
    return model

def train_game_outcome_model(X, y):
    model = GameOutcomeModel()
    model.fit(X, y)
    return model

def train_metric_model(X, y):
    model = MetricModel()
    model.fit(X, y)
    return model
