import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/posts/byId/' + id).then((res) => {
      setPostObject(res.data);
    });

    axios.get('http://localhost:3001/comments/' + id).then((res) => {
      setComments(res.data);
      // console.log(comments);
    });
  }, [id]);

  const addComment = () => {
    const getComments = async () => {
      const res = await axios.get('http://localhost:3001/comments/' + id);
      setComments(res.data);
    };
    axios
      .post(
        'http://localhost:3001/comments/',
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          console.log(res.data.error);
        } else {
          getComments();
          setNewComment('');
          console.log('Comment added');
        }
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={comment.id} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
