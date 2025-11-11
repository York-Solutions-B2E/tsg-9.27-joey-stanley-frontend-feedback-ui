import { useState } from "react";

function MemberIdSearch() {
    //Field states
    const [memberId, setMemberId] = useState('');
    const [feedback, setFeedback] = useState([]);

    //Search by member id GET Request
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/v1/feedback/${memberId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            if (data.length > 0) {
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
    <ul>
     {feedback.map((item, index) => (
     <li key={index}>
        <p><strong>Provider:</strong> {item.providerName}</p>
        <p><strong>Rating:</strong> {item.rating}</p>
        <p><strong>Comment:</strong> {item.comment}</p>
     </li>))}
    </ul>
    </>
    )
}

export default MemberIdSearch;