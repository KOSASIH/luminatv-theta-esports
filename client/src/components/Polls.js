import React, { useState } from 'react';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
  });

  useEffect(() => {
    // Fetch polls from the API
    // setPolls(fetchedPolls);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, e) => {
    const { value } = e.target;
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      options: prevPoll.options.map((option, i) =>
        i === index ? value : option
      ),
    }));
  };

  const handleAddOption = () => {
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      options: [...prevPoll.options, ''],
    }));
  };

  const handleRemoveOption = (index) => {
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      options: prevPoll.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new poll with the newPoll data
    // setPolls([...polls, newPoll]);
    setNewPoll({
      question: '',
      options: ['', ''],
    });
  };

  return (
    <div>
      <h1>Polls</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          name="question"
          value={newPoll.question}
          onChange={handleInputChange}
        />
        {newPoll.options.map((option, index) => (
          <div key={index}>
            <label htmlFor={`option-${index}`}>Option {index + 1}:</label>
            <input
              type="text"
              name={`option-${index}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
            />
            {newPoll.options.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <h2>{poll.question}</h2>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Polls;
