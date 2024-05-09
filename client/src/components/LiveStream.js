import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThetaPlayer } from 'theta-player-react';

const LiveStream = () => {
  const { streamId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const newPlayer = new ThetaPlayer('player-container', {
      source: `https://stream.luminatv.com/${streamId}.m3u8`,
      autoplay: true,
      controls: true,
    });

    setPlayer(newPlayer);

    return () => {
      newPlayer.destroy();
    };
  }, [streamId]);

  return (
    <div>
      <h1>Live Stream</h1>
      <div id="player-container" />
    </div>
  );
};

export default LiveStream;
