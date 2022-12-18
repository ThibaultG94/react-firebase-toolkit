import React, { useEffect, useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
import { collection, doc, getDocs } from 'firebase/firestore';
import Post from './components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './feature/post.slice';

const App = () => {
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts.posts);

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	useEffect(() => {
		getDocs(collection(db, 'posts')).then((res) =>
			dispatch(
				getPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			)
		);
	}, []);

	const handleLogout = async () => {
		await signOut(auth);
	};

	return (
		<div>
			<div className="app-header">
				{user && (
					<div className="user-infos">
						<span>{user?.displayName[0]}</span>
						<h4>{user?.displayName}</h4>
						<button onClick={() => handleLogout()}>
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
						</button>
					</div>
				)}
				{user ? (
					<CreatePost uid={user.uid} displayName={user.displayName} />
				) : (
					<ConnectModal />
				)}
			</div>
			<div className="posts-container">
				{posts &&
					[...posts]
						.sort((a, b) => b.date - a.date)
						.map((post) => (
							<Post post={post} key={post.id} user={user} />
						))}
			</div>
		</div>
	);
};

export default App;
