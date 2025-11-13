import { useState } from "react";

function MemberIdSearch() {
    //Field states
    const [memberId, setMemberId] = useState('');
    const [feedback, setFeedback] = useState([]);
    const [noResults, setNoResults] = useState(false);

    //Search by member id GET Request
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNoResults(false);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/feedback?memberId=${memberId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            if (data.length > 0) {
                setFeedback(data);
            } else {
                setFeedback([]);
                setNoResults(true);
            }

        } catch(error) {
            console.error('Feedback Network Error:', error);
        }
    }

    return(
    <>
    <h2>Search Feedback by Member ID:</h2>
    <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button type="submit" disabled={!memberId}>
          Search
        </button>
    </form>
    {noResults && <p>No results found.</p>}
    <div>
        {feedback.map((item, index) => (
            <div key={index} className="feedback-box">
                <p><strong>Provider:</strong> {item.providerName}</p>
                <p><strong>Rating:</strong> {item.rating}</p>
                <p><strong>Comment:</strong> {item.comment}</p>
            </div>
            ))}
    </div>
    </>
    )
}

export default MemberIdSearch;