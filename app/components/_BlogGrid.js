//app/components/BlogGrid.js

// "use client";
// import Link from "next/link";

// const BlogGrid = ({ groupedPosts }) => {
//   return (
//     <div className="space-y-16">
//       {Object.entries(groupedPosts).map(([category, posts]) => (
//         <div key={category}>
//           <h2 className="text-3xl font-thin text-gray-400 mb-6 capitalize">{category}</h2>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//             {posts.map((post) => {
//               const imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
//               const title = post?.title?.rendered || "";

//               return (
//                 <Link key={post.id} href={`/blog/${post.slug}`}>
//                   <div className="relative group rounded-xl overflow-hidden h-[200px] w-full cursor-pointer shadow-md">
//                     {/* Background image */}
//                     <div
//                       className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
//                       style={{ backgroundImage: `url(${imageUrl})` }}
//                     />
//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-opacity-40" />
//                     {/* Content */}
//                     <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
//                       <h3
//                         className="text-white text-2xl font-bold mb-4 drop-shadow"
//                         dangerouslySetInnerHTML={{ __html: title }}
//                       />
//                       <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
//                         Voir
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogGrid;
"use client";
import Link from "next/link";

const BlogGrid = ({ groupedPosts }) => {
  return (
    <div className="space-y-16">
      {Object.entries(groupedPosts).map(([category, posts]) => (
        <div key={category}>
          <h2 className="text-3xl font-thin text-gray-400 mb-6 capitalize">{category}</h2>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {posts.map((post) => {
              const imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
              const title = post?.title?.rendered || "";

              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer shadow-md">
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-opacity-40" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                      <h3
                        className="text-white text-2xl font-bold mb-4 drop-shadow"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                      <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                        Voir
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
