import React from 'react'
import { useEffect, useState, useContext } from "react";
import moment from 'moment';
import { AppContext } from '../Context/AppContext';
import { Loader } from './Loader';

function InputForm(props) {

  const [tweet, setTweet] = useState("");
  const [formData, setFormData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const urlServer = `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
  const appContext = useContext(AppContext);


  const handleTweetInput = (e) => {
    setTweet(e.target.value);
  };

  useEffect(() => {
    let savedUserName = localStorage.getItem("UserName");
    if (savedUserName) {
        appContext.setUserName(JSON.parse(savedUserName));
    }
  })
  
  useEffect(() => {
    if (tweet.length <= 140 && tweet.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (tweet.length > 140 ) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [tweet.length]);
  
  useEffect(() => {
    setFormData({
      content: tweet,
      userName: appContext.userName,
      date: moment().format(),
      id: Date.now(),
    });
    
  }, [tweet.length]);


  const handleClick = () => {
    if (appContext.userName) {
      setIsLoading(true);
      setIsDisabled(true);
   
      const tweetPost = {
        content: tweet,
        userName: appContext.userName,
        date: moment().format(),
      };

      fetch(urlServer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetPost),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        
        });
      
      setTimeout(() => {
        appContext.setTweetArray((prevState) => {
          return [formData, ...prevState];
        });
        setIsLoading(false)
        setIsDisabled(false);
        setTweet("");
        setFormData({});
      }, 1000);
    }
  };



  return (
    <>
    <div className="input-wrapper">
      <textarea

        placeholder="What you have in mind..."
        className="tweet-input"
        value={tweet}
        onInput={handleTweetInput}
        
        
      >
      </textarea>   <button
        disabled={isDisabled}
        className="tweet-button"
        onClick={handleClick}
      >Tweet</button>
    </div>
      
      {warning && <div className="warning">The maximum length of the tweet is 140 characters.</div>}
      {!appContext.userName && <div className="warning">Please enter a user name in the profile page</div>}   
      {isLoading && <div className="loader-align"><Loader /></div>}
    </>
    
  )
}

export default InputForm
