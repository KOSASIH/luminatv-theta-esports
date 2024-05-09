# ai_training.py
import os
import pandas as pd
from ai_models import load_data, preprocess_data, train_player_performance_model, train_game_outcome_model, train_metric_model

def train_ai_models(data_dir, model_dir):
    # Load data
    file_path = os.path.join(data_dir, 'player_data.csv')
    X, y = load_data(file_path)

    # Preprocess data
    X_scaled, y = preprocess_data(X, y)

    # Train player performance model
    player_performance_model = train_player_performance_model(X_scaled, y)
    torch.save(player_performance_model.state_dict(), os.path.join(model_dir, 'player_performance_model.pth'))

    # Train game outcome model
    game_outcome_model = train_game_outcome_model(X_scaled, y)
    joblib.dump(game_outcome_model, os.path.join(model_dir, 'game_outcome_model.joblib'))

    # Train metric model
    metric_model = train_metric_model(X_scaled, y)
    joblib.dump(metric_model, os.path.join(model_dir, 'metric_model.joblib'))

if __name__ == '__main__':
    data_dir = 'data'
    model_dir = 'models'
    train_ai_models(data_dir, model_dir)
