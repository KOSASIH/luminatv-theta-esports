import React, { useState, useEffect } from 'eact';
import { useSelector, useDispatch } from 'edux-react';
import { pollActions } from '../store/pollSlice';
import { socket } from '../socket';

const PollsController = () => {
  const [polls, setPolls] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const pollId = useSelector((state) => state.poll.pollId);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join-poll', pollId);
    };

    const handleReceivePoll = (poll) => {
      setPolls((prevPolls) => [...prevPolls, poll]);
    };

    const handleReceiveVote = (vote) => {
      setPolls((prevPolls) =>
        prevPolls.map((p) => (p.id === vote.pollId ? { ...p, votes: [...p.votes, vote] } : p))
      );
    };

    const handleDisconnect = () => {
      setError('Disconnected from poll');
    };

    socket.on('connect', handleConnect);
    socket.on('receive-poll', handleReceivePoll);
    socket.on('receive-vote', handleReceiveVote);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receive-poll', handleReceivePoll);
      socket.off('receive-vote', handleReceiveVote);
      socket.off('disconnect', handleDisconnect);
    };
  }, [pollId]);

  const handleCreatePoll = async () => {
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/polls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input,
          options: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create poll');
      }

      const data = await response.json();
      setPolls((prevPolls) => [...prevPolls, data]);
      setInput('');
      dispatch(pollActions.setPollId(data.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = (pollId, optionIndex) => {
    setIsLoading(true);
    setError(null);

    socket.emit('vote', { pollId, optionIndex });
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <strong>{poll.question}</strong>
            {poll.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleVote(poll.id, index)}
                disabled={poll.votes.some((vote) => vote.optionIndex === index)}
              >
                {option}
              </button>
            ))}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleCreatePoll();
          }
        }}
      />
      <button onClick={handleCreatePoll}>Create Poll</button>
    </div>);
};

export default PollsController;
