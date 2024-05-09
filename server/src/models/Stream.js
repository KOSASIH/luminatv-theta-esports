import React, { useEffect, useRef } from 'eact';
import { useSelector, useDispatch } from 'edux-react';
import { streamActions } from '../store/streamSlice';
import { socket } from '../socket';

const Stream = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const streamId = useSelector((state) => state.stream.streamId);

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join-stream', streamId);
    };

    const handleReceiveStream = (stream) => {
      setIsLoading(false);
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    };

    const handleDisconnect = () => {
      setError('Disconnected from stream');
    };

    socket.on('connect', handleConnect);
    socket.on('receive-stream', handleReceiveStream);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receive-stream', handleReceiveStream);
      socket.off('disconnect', handleDisconnect);
    };
  }, [streamId]);

  const handleStartStream = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/streams`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      const data = await response.json();
      dispatch(streamActions.setStreamId(data.id));
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
      <video ref={videoRef} width="640" height="480" autoPlay />
      <button onClick={handleStartStream} disabled={isLoading}>
        Start Stream
      </button>
    </div>
  );
};

export default Stream;
