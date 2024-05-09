import React, { useState, useEffect } from 'eact';
import { useSelector, useDispatch } from 'edux-react';
import { pollActions } from '../store/pollSlice';
import { socket } from '../socket';

const Poll = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const pollId = useSelector((state) => state.poll.pollId);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join-poll', pollId);
    };

    const handleReceiveResults = (results) => {
      setResults(results);
    };

    const handleDisconnect = () => {
      setError('Disconnected from poll');
    };

    socket.on('connect', handleConnect);
    socket.on('receive-results', handleReceiveResults);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receive-results', handleReceiveResults);
      socket.off('disconnect', handleDisconnect);
    };
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedOption) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          option: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      const data = await response.json();
      setResults(data);
      setSelectedOption(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {results.map((result) => (
          <li key={result.option}>
            {result.option}: {result.votes} votes
          </li>
        ))}
      </ul>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Select an option</option>
        {results.map((result) => (
          <option key={result.option} value={result.option}>
            {result.option}
          </option>
        ))}
      </select>
      <button onClick={handleVote} disabled={isLoading}>
        Vote
      </button>
    </div>
  );
};

export default Poll;
