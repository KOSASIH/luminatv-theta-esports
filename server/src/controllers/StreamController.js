import React, { useState, useEffect } from 'eact';
import { useSelector, useDispatch } from 'edux-react';
import { streamActions } from '../store/streamSlice';
import { chatActions } from '../store/chatSlice';
import { pollActions } from '../store/pollSlice';
import { THETA_API_URL, THETA_API_KEY } from '../constants';

const StreamController = () => {
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const streamId = useSelector((state) => state.stream.streamId);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch(`${THETA_API_URL}/streams/${streamId}`, {
          headers: {
            'x-api-key': THETA_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stream');
        }

        const data = await response.json();
        setStream(data);
        setIsStreaming(data.isStreaming);
        setIsPaused(data.isPaused);
        setIsStopped(data.isStopped);
      } catch (err) {
        setError(err.message);
      }
    };

    if (streamId) {
      fetchStream();
    }
  }, [streamId]);

  const handleStartStream = async () => {
    try {
      const response = await fetch(`${THETA_API_URL}/streams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': THETA_API_KEY,
        },
        body: JSON.stringify({
          title: 'Live Esports Stream',
          description: 'A live esports stream on Theta network',
          category: 'esports',
          tags: ['esports', 'theta', 'stream'],
          isDvrEnabled: true,
          isPublic: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      const data = await response.json();
      dispatch(streamActions.setStreamId(data.id));
      setStream(data);
      setIsStreaming(true);
      setIsPaused(false);
      setIsStopped(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePauseStream = async () => {
    try {
      const response = await fetch(`${THETA_API_URL}/streams/${streamId}/pause`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': THETA_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to pause stream');
      }

      setStream((prevStream) => ({
        ...prevStream,
        isPaused: true,
      }));
      setIsStreaming(false);
      setIsPaused(true);
      setIsStopped(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResumeStream = async () => {
    try {
      const response = await fetch(`${THETA_API_URL}/streams/${streamId}/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': THETA_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to resume stream');
      }

      setStream((prevStream) => ({
       ...prevStream,
        isPaused: false,
      }));
      setIsStreaming(true);
      setIsPaused(false);
      setIsStopped(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStopStream = async () => {
    try {
      const response = await fetch(`${THETA_API_URL}/streams/${streamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': THETA_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to stop stream');
      }

      setStream(null);
      setIsStreaming(false);
      setIsPaused(false);
      setIsStopped(true);
      dispatch(streamActions.resetStream());
      dispatch(chatActions.resetChat());
      dispatch(pollActions.resetPoll());
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!stream) {
    return (
      <button onClick={handleStartStream}>
        Start Stream
      </button>
    );
  }

  return (
    <div>
      <p>
        {isStreaming
          ? isPaused
            ? 'Stream paused'
            : 'Stream live'
          : 'Stream stopped'}
      </p>
      <button onClick={isStreaming ? (isPaused ? handleResumeStream : handlePauseStream) : handleStartStream}>
        {isStreaming ? (isPaused ? 'Resume' : 'Pause') : 'Start'} Stream
      </button>
      <button onClick={handleStopStream}>Stop Stream</button>
    </div>
  );
};

export default StreamController;
