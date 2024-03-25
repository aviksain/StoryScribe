import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import Hero from "../assets/Hero.svg";

function Home() {
  const login = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await appwriteService.getPosts([]);
        if (posts) {
          const filteredPosts = posts.documents.filter((post) => {
            if (userData.$id === post.$id) console.log(post);
            return userData.$id === post.userId;
          });
          setUserPosts(filteredPosts);
          console.log(userData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  }, []);

  if (userPosts.length === 0 && userData != null) {
    return (
      <>
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full content-center">
              <div className="relative h-screen md:h-96 sm:h-full xl:h-screen flex items-center justify-center sm:items-center sm:justify-center">
                <div className="w-full flex flex-col md:flex-row items-center justify-center">
                  <div className="md:w-1/2 md:pr-8 text-white">
                    <h1 className="text-3xl sm:text-5xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4">
                      Explore Ideas,
                      Inspire Creativity,
                      Connect.
                    </h1>
                    <p className="text-lg sm:text-xl md:text-xl xl:text-2xl mb-8">
                      StoryScribe, your way of...
                      <br /> Discover, Learn, Share, Inspire.
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src={Hero}
                      alt="Hero Illustration"
                      className="mx-auto max-w-full rounded-xl"
                      style={{
                        filter: "drop-shadow(2px 2px 4px rgb(255, 12, 12)))",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return login ? (
    <div className="w-full py-16">
      <Container>
        <h1 className="text-3xl bold italic mb-3 text-white">My Posts : </h1>
        <div className="flex flex-wrap">
          {userPosts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <Container>
      <div className="flex flex-wrap">
        <div className="p-2 w-full content-center">
          <div className="relative h-screen md:h-96 sm:h-full xl:h-screen flex items-center justify-center sm:items-center sm:justify-center">
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
              <div className="md:w-1/2 md:pr-8 text-white">
                <h1 className="text-3xl sm:text-5xl md:text-5xl xl:text-6xl font-bold leading-tight mb-4">
                  Explore Ideas, Inspire Creativity, Connect.
                </h1>
                <p className="text-lg sm:text-xl md:text-xl xl:text-2xl mb-8">
                  Bloger, your way of...
                  <br /> Discover, Learn, Share, Inspire.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={Hero}
                  alt="Hero Illustration"
                  className="mx-auto max-w-full rounded-xl"
                  style={{
                    filter: "drop-shadow(2px 2px 4px rgb(255, 12, 12)))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
