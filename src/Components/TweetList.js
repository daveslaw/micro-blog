import React from 'react';
import { AppContext } from '../Context/AppContext';
import { useContext } from 'react';


function TweetList (props) {
  const { type } = props;
  const appContext = useContext(AppContext);
  
    return (
      <>
        {type === "tweets" && (
        <div className="list">
          {appContext.tweetArray.map((tweet) => {
            return (
              <div key={tweet.id} className="list-item">
                <div className="tweet-header">
                  <div className="tweet-header-username">{tweet.userName}</div>
                  <div className="tweet-header-date">{tweet.date}</div>
                </div>
                <div className="tweet-content">{tweet.content}</div>                
                
                
              </div>
            );
          })}
        </div>
      )}
      </>
    );
  }

export default TweetList
