import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comObj, setComObj] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const handelLike = async () => {
    setLiked(liked => !liked); // Toggle liked state
  
    setLikes(likes => liked ? likes - 1 : likes + 1); // Update likes count
  
    const updatedLikes = liked ? likes - 1 : likes + 1; // Calculate updated likes count
  
    if (post.likeObj !== null && post.likeObj.trim() !== "") {
      let likeObj = JSON.parse(post.likeObj);
      likeObj[userData.name] = !liked; // Toggle like status for current user
      console.log(likes);
      await appwriteService.updateLike(slug, updatedLikes, JSON.stringify(likeObj));
    } else {
      const likeObj = {
        [userData.name]: !liked
      }
      console.log(likes);
      await appwriteService.updateLike(slug, updatedLikes, JSON.stringify(likeObj));
    }
  }

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          if (post.comments != null && post.comments.trim() !== "") {
            const parsedComments = JSON.parse(post.comments);
            setComObj(parsedComments);
            setComments(Object.keys(parsedComments));
            setLikes(post.likes);
            if(post.likeObj!== null && post.likeObj.trim() !== "") {
              let likeObj = JSON.parse(post.likeObj);
              if(likeObj[userData.name] !== undefined && likeObj[userData.name] !== false) {
                setLiked(true);
              }
            }
          } else {
            setComObj({});
            setComments([]);
          }
          // console.log(comObj);
          // console.log(post.comments);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const updateComment = async () => {
    try {
      // console.log(jsonComment);

      comObj[userData.name] = comment;

      let strComments = JSON.stringify(comObj);

      // console.log(jsonComment);
      // Updating the document. Adding the phone at the end of the array attribute
      await appwriteService.updateComment(slug, strComments);

      location.reload();
    } catch (e) {
      console.log("Error in update comment" + e);
    }
  };

  const deleteComment = async () => {
    try {
      // Check if the key exists before attempting to delete
      if (comObj.hasOwnProperty(userData.name)) {
        // Delete the key-value pair
        delete comObj[userData.name];

        // Convert the updated object back to JSON
        let updatedJsonComment = JSON.stringify(comObj);

        // Update the document
        await appwriteService.updateComment(slug, updatedJsonComment);

        // Reload the page
        location.reload();
      }
    } catch (e) {
      console.log("Error in delete comment: " + e);
    }
  };

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 backdrop-blur-lg text-white">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="italic text-normal">Author: {post.postAuthor}</h1>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <button
              type="button"
              className="flex px-3"
              onClick={handelLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={liked ? "red" : "none"} stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span class="sr-only">Icon description</span>
              {likes ? likes : 0}
            </button>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </div>

        <div className="">
          <section className="bg-slate-700 rounded-xl py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-700 dark:text-white">
                  Comments ({comments.length})
                </h2>
              </div>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  id="comment"
                  rows="6"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                onClick={updateComment}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Post Comment
              </button>

              {comments.map((key) => (
                <article
                  key={key}
                  className="p-6 mb-3 mt-5 text-base bg-white rounded-lg dark:bg-gray-900"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        {key}
                      </p>
                    </div>
                    {key == userData.name ? (
                      <button
                        className="underline hover:opacity-75"
                        onClick={deleteComment}
                      >
                        DeleteComment
                      </button>
                    ) : null}
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comObj[key]}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  ) : null;
}
