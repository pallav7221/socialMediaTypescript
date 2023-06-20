import React, { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../index";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useUserData } from "../User/userSlice";
import Posts from "../components/Posts";
import Header from "../components/Header"

export interface PostData {
  profileImg: string;
  caption: string;
  imgUrl: string;
  username: string;
  photoURL:string;
  postId: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<{ id: string; post: PostData }[]>([]);
  console.log("posts-----",posts)
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (doc) => {
      setPosts(
        doc.docs.map((doc) => ({
          id: doc.id,
          post: doc.data() as PostData,
        }))
      );
    });

    return () => unsub();
  }, []);

  const user = useUserData();

  return (
    <div className="home">
      <Header />
      {posts.map(({ id, post }) => (
        <Posts
          key={id}
          photoURL={post.profileImg}
          postId={id}
          caption={post.caption}
          imgUrl={post.imgUrl}
          username={post.username} profileImg={post.profileImg}       />
      ))}
    </div>
  );
};

export default Home;
