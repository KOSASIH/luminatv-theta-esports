import Stream from '../../models/Stream';
import { v4 as uuidv4 } from 'uuid';

describe('Stream', () => {
  let stream;

  beforeEach(() => {
    stream = new Stream({
      id: uuidv4(),
      title: 'Test Stream',
      description: 'This is a test stream.',
      schedule: '2023-03-15T15:00:00Z',
      sponsors: ['Acme Corp', 'Corp Inc'],
      chat: [],
      polls: [],
    });
  });

  it('should have an id', () => {
    expect(stream.id).toBeDefined();
  });

  it('should have a title', () => {
    expect(stream.title).toBe('Test Stream');
  });

  it('should have a description', () => {
    expect(stream.description).toBe('This is a test stream.');
  });

  it('should have a schedule', () => {
    expect(stream.schedule).toBe('2023-03-15T15:00:00Z');
  });

  it('should have sponsors', () => {
    expect(stream.sponsors).toEqual(expect.arrayContaining(['Acme Corp', 'Corp Inc']));
  });

  it('should have a chat array', () => {
    expect(stream.chat).toEqual([]);
  });

  it('should have a polls array', () => {
    expect(stream.polls).toEqual([]);
  });

  it('should add a chat message', () => {
    const message = 'Hello, world!';
    stream.addChatMessage(message);
    expect(stream.chat).toEqual([{ message, timestamp: expect.any(String) }]);
  });

  it('should add a poll', () => {
    const question = 'What is your favorite color?';
    const options = ['Red', 'Blue', 'Green'];
    stream.addPoll(question, options);
    expect(stream.polls).toEqual([
      {
        question,
        options,
        responses: {},
      },
    ]);
  });

  it('should add a poll response', () => {
    const question = 'What is your favorite color?';
    const options = ['Red', 'Blue', 'Green'];
    stream.addPoll(question, options);
    stream.addPollResponse(question, 'Red');
    expect(stream.polls).toEqual([
      {
        question,
        options,
        responses: { Red: 1 },
      },
    ]);
  });
});
