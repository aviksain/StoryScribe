import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import TextExtractor from "./TextExtractor";

function PostCard({ $id, title, content, featuredImage, likes }) {
  // bit css
  const outer = {
    // background:"linear-gradient(158deg, #ff9696, #ffff9a, #ffd27ed3)",
    // boxSizing:'border-box'
  };

  return (
    <Link to={`/post/${$id}`}>
      <div
        className="hover:scale-110 transform transition-transform duration-300 ease-in-out prose w-full rounded-xl p-4 backdrop-blur-lg border-2 border-slate-300 border-solid text-white"
        style={outer}
      >
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>

        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="red"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span class="sr-only">Icon description</span>
            {likes ? likes : 0}
          </div>
        </div>
        <TextExtractor
          class="mb-3 font-normal text-white dark:text-gray-400"
          htmlContent={content}
          wordLimit={10}
        />
      </div>
    </Link>

    // <Link to={`/post/${$id}`}>
    //   <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
    //     <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
    //       <img
    //         src="https://images.unsplash.com/photo-1706200234292-66928ea63168?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         alt="profile-picture"
    //       />
    //     </div>
    //     <div class="p-6 text-center">
    //       <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    //         Natalie Paisley
    //       </h4>
    //       <p class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
    //         CEO / Co-Founder
    //       </p>
    //     </div>
    //     <div class="flex justify-center p-6 pt-2 gap-7">
    //       <a
    //         href="#facebook"
    //         class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
    //       >
    //         <i class="fab fa-facebook" aria-hidden="true"></i>
    //       </a>
    //       <a
    //         href="#twitter"
    //         class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400"
    //       >
    //         <i class="fab fa-twitter" aria-hidden="true"></i>
    //       </a>
    //       <a
    //         href="#instagram"
    //         class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"
    //       >
    //         <i class="fab fa-instagram" aria-hidden="true"></i>
    //       </a>
    //     </div>
    //   </div>
    // </Link>
  );
}

export default PostCard;
