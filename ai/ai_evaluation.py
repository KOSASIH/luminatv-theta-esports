# ai_evaluation.py
import os
import pandas as pd
from sklearn.metrics import mean_squared_error, accuracy_score
from ai_models import load_data, preprocess_data
import torch
import joblib

def evaluate_player_performance_model(model_path, data_dir):
    file_path = os.path.join(data_dir, 'player_data.csv')
    X, y = load_data(file_path)
    X_scaled, y = preprocess_data(X, y)

    model = torch.load(model_path)
    model.eval()
    outputs = model(X_scaled)
    y_pred = outputs.detach().numpy()
    mse = mean_squared_error(y, y_pred)
    return mse

def evaluate_game_outcome_model(model_path, data_dir):
    file_path = os.path.join(data_dir, 'game_data.csv')
    X, y = load_data(file_path)
    X_scaled, y = preprocess_data(X, y)

    model = joblib.load(model_path)
    y_pred = model.predict(X_scaled)
    accuracy = accuracy_score(y, y_pred)
    return accuracy

def evaluate_metric_model(model_path, data_dir):
    file_path = os.path.join(data_dir, 'metric_data.csv')
    X, y = load_data(file_path)
    X_scaled, y = preprocess_data(X, y)

    model = joblib.load(model_path)
    y_pred = model.predict(X_scaled)
    mse = mean_squared_error(y, y_pred)
    return mse

if __name__ == '__main__':
    model_dir = 'models'
    data_dir = 'data'

    player_performance_model_path = os.path.join(model_dir, 'player_performance_model.pth')
    game_outcome_model_path = os.path.join(model_dir, 'game_outcome_model.joblib')
    metric_model_path = os.path.join(model_dir, 'metric_model.joblib')

    print('Player Performance Model MSE:', evaluate_player_performance_model(player_performance_model_path, data_dir))
    print('Game Outcome Model Accuracy:', evaluate_game_outcome_model(game_outcome_model_path, data_dir))
    print('Metric Model MSE:', evaluate_metric_model(metric_model_path, data_dir))
