import { AiFillLike } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "../../pages/Feed/Feed.module.css"; 
export default function PostCard({ post, liked, likeColor, likeActiveColor, getInitials, onLike, onDelete }) {
  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.avatarPlaceholder}>{getInitials(post.nome || "User")}</div>
        <div>
          <p className={styles.authorName}>{post.nome || "Anônimo"}</p>
          <p className={styles.postDate}>
            {post.dataPostagem ? new Date(post.dataPostagem).toLocaleDateString("pt-br") : "Agora"}
          </p>
        </div>
      </div>
      
      <p className={styles.postContent}>{post.postagem}</p>
      
      <div className={styles.postActions}>
        <button 
          className={styles.actionBtn} 
          style={{ color: liked ? likeActiveColor : likeColor }} 
          onClick={() => onLike(post.id)}
        >
          <AiFillLike /> <span>{liked ? post.likes + 1 : post.likes}</span>
        </button>
        
        <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}