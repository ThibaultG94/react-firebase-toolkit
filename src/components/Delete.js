import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../feature/post.slice';
import { db } from '../utils/firebase.config';

const Delete = ({ postId }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		deleteDoc(doc(db, 'posts', postId)).then(() => {
			dispatch(deletePost(postId));
		});
	};

	return (
		<span className="delete" onClick={(e) => handleDelete(e)}>
			<i className="fa-solid fa-trash-can"></i>
		</span>
	);
};

export default Delete;
