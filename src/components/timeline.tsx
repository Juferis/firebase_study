import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import Tweet from './tweet';

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { userId, username, createdAt, tweet, photo } = doc.data();
      return {
        id: doc.id,
        userId,
        username,
        createdAt,
        tweet,
        photo,
      };
    });
    setTweet(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export interface ITweet {
  id: string;
  userId: string;
  username: string;
  createdAt: number;
  tweet: string;
  photo: string;
}
