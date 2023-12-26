import databaseService from "../appwrite/database";
import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";

function AllPosts(){
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        databaseService.ListDocuments([]).then(
            (result)=>{
                console.log(result);
                if(result) setPosts(result.documents)

            }
        )
    },[])
    return(
        <div className='w-full py-8'>
            <Container>
               <div className="flex flex-wrap">
                {posts?.map((post)=>(<div key={post.$id}>
                    <PostCard post={post}/>
                </div>))}
               </div>
            </Container>

        </div>
    )
}

export default AllPosts;