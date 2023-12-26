import databaseService from "../../appwrite/database";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            className="rounded-xl"
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        </div>
        <h2 className="text-xl, font-bold">{post.title}</h2>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  $id: PropTypes.string,
  title: PropTypes.string,
  featuredImage: PropTypes.string,
};

export default PostCard;
