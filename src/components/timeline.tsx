import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import Tweet from './tweet';

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
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
      });
    };
    fetchTweets();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
