import { useEffect, useState } from "react";
import ReactStars from "react-stars";

function Survey() {
    //Survey input fields states
    const [memberId, setMemberId] = useState('');
    const [providerName, setProviderName] = useState('');
    const [rating, setRating] = useState(1); 
    const [comment, setComment] = useState('');

    //Error Messsages
    const [memIdMsg, setMemIdMsg] = useState('');
    const [providerNmMsg, setProviderNmMsg] = useState('');
    const [commentMsg, setCommentMsg] = useState('');

    //Form Validation
    useEffect(() => {
        if (memberId.length >= 36) {
            setMemIdMsg('Max Characters Reached (36)')
        } else {
            setMemIdMsg('')
        }

        if(providerName.length >= 80) {
            setProviderNmMsg('Max Characters Reached (80)')
        } else {
            setProviderNmMsg('')
        }

        if(comment.length >= 200) {
            setCommentMsg('Max Characters Reached (200)')
        } else {
            setCommentMsg('')
        }
    },[memberId, providerName, comment]);
    
    //Survey data POST Request
    const handleSubmit = async (e) => {
        e.preventDefault();

        const surveyData = {
            memberId,
            providerName,
            rating,
            comment
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                console.log('survery was submitted, reponse ok, delete this later')
                setMemberId('');
                setProviderName('');
                setRating(1);
                setComment('');
            } else {
                console.error('response not ok error')
            }

        } catch(error) {
            console.error('Survey Network Error:', error)
        }
    }


    return (
        <>
        <h2>Survey Page</h2>
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          maxLength={36}
        ></input>
        <div className="error">{memIdMsg}</div>

        <input 
          type="text"
          placeholder="Provider Name"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
          maxLength={80}
        ></input>
        <div className="error">{providerNmMsg}</div>

        <ReactStars
          count={5}
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          size={30}
          half={false} 
          activeColor="#ffd700"
        />

        <label>Comments: </label>
        <textarea 
          type="text"
          value={comment}
          rows="5"
          cols="50"
          onChange={(e) => setComment(e.target.value)}
          maxLength={200}
        ></textarea>
        <div className="error">{commentMsg}</div>

        <button
          type="submit"
          disabled={!memberId || !providerName || !comment}
        > Submit
        </button>
        </form>
        </>
    )
}
export default Survey;