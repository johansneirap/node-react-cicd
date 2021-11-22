import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get('/posts').then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  return (
    <div>
      {listOfPosts && listOfPosts.map((value, key) => {
        return (
          <div
            key={value.id}
            className="post"
            onClick={() => {
              history.push(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title} DEPLOYED WITH GITHUB ACTIONS CI/CD</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
