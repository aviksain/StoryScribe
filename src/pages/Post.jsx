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

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          if (post.comments != null && post.comments.trim() !== "") {
            const parsedComments = JSON.parse(post.comments);
            setComObj(parsedComments);
            setComments(Object.keys(parsedComments));
          } else {
            setComObj({});
            setComments([]);
          }
          console.log(comObj);
          console.log(post.comments);
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
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
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
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
              <span class="sr-only">Icon description</span>
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
                    <button
                      className="underline hover:opacity-75"
                      onClick={deleteComment}
                    >
                      DeleteComment
                    </button>
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
