import { useState } from "react";

function FeedbackIdSearch() {
    //Field states
    const [feedbackId, setFeedbackId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [noResults, setNoResults] = useState(false);

    //Search by Feedback id GET Request
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNoResults(false);
        setFeedback('');

        try {
            const response = await fetch(`http://localhost:8080/api/v1/feedback/${feedbackId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                setNoResults(true);
                return;
            }

            const data = await response.json();
            setFeedback(data);

        } catch(error) {
            console.error('Feedback Network Error:', error);
        }
    }

    return(
    <>
    <h2>Search Feedback by Feedback ID:</h2>
    <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Feedback ID"
          value={feedbackId}
          onChange={(e) => setFeedbackId(e.target.value)}
        />
        <button type="submit" disabled={!feedbackId}>
          Search
        </button>
    </form>
    {noResults && <p>No results found.</p>}
    {feedback && (
      <div className="feedback-box">
        <p><strong>Provider:</strong> {feedback.providerName}</p>
        <p><strong>Rating:</strong> {feedback.rating}</p>
        <p><strong>Comment:</strong> {feedback.comment}</p>
      </div>
    )}
    </>
    )
}

export default FeedbackIdSearch;