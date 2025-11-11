import { useState } from "react";

function FeedbackIdSearch() {
    //Field states
    const [feedbackId, setFeedbackId] = useState('');
    const [feedback, setFeedback] = useState('');

    //Search by Feedback id GET Request
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/v1/feedback/${feedbackId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            if (data) {
                console.log('Feedback search result:', data) //DELETE LATER
                setFeedback(data);
            } else {
                setFeedback("no results found"); //Might have to change. maybe just console log error and include a "no results found" element below
            }

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
    {feedback && (
      <>
        <p><strong>Provider:</strong> {feedback.providerName}</p>
        <p><strong>Rating:</strong> {feedback.rating}</p>
        <p><strong>Comment:</strong> {feedback.comment}</p>
      </>
    )}
    </>
    )
}

export default FeedbackIdSearch;