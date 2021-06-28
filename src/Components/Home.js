import '../App.css';
import InputForm from '../Components/InputForm';
import TweetList from '../Components/TweetList';
import { useEffect, useContext } from 'react';
import { performFetch } from '../Lib/ServerFunctions';
import { AppContext } from '../Context/AppContext';


function Home() {

  const appContext = useContext(AppContext);


  useEffect(() => {
    performFetch()
      .then((response) => response.json())
      .then((data) => {
        appContext.setTweetArray(data.tweets);
      })
      .catch((error) => {
        console.error(error);
      });

  } )

  useEffect(() => {
    setInterval(() => {
     performFetch()
     .then((response) => response.json())
     .then((data) => {
       appContext.setTweetArray(data.tweets);
     })
     .catch((error) => {
       console.error(error);
     });
     console.log("Success") 
    }, 120000);
    
  }, [])
 





  return (

    <div className="App main-wrapper">
      <InputForm />
      <TweetList
        type="tweets"
      />
    </div>

  );

}

export default Home;
