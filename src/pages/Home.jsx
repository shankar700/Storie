import {useEffect, useState} from 'react'
import databaseService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData)

    useEffect(()=>{
        if(userData){
            databaseService.ListDocuments([]).then((result) => {
                if(result){
                    setPosts(result.documents)
                }
            })
        }else{
            setPosts([])
        }
    },[userData])
  
    if(posts.length > 0){
       return <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post) => (
                        <div key={post?.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    }else{
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link to='/login'>
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home