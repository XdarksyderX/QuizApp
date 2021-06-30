import React, { useState, useEffect } from 'react';
import { Question } from './Question/Question';

export const GameScreen = () => {
	const [hits, setHits] = useState(0);
	const [question, setQuestion] = useState(<Question setHits={setHits} hits={hits} />);

	useEffect(() => {
		setQuestion(<Question setHits={setHits} hits={hits} />);
	}, [hits]);

	return (
		<div>
			{question}
		</div>
	);
};
