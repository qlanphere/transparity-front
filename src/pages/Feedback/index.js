import React, { useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    transparency: "",
    punctuality: "",
    awareness: "",
  });
  const [rating, setRating] = useState(0);

  function handleSubmit(e){
    e.preventDefault()
  }
  return (
    <div>
      <h1>Feedback form</h1>
      <sub>Please select the rating for each areas.</sub>
      <form onSubmit={handleSubmit} aria-label="feedback">
        <div className="m-5 areas">
          <div className="area1">
          <label>
            Did you receive an email from the charity to tell you how your
            donation was used?</label><br/>
            <div className="radio-btn-cont">
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 1}
                    />
                     1
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 2}
                    />
                     2
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 3}
                    />
                     3
                </div> 
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 4}
                    />
                     4
                </div>  
                <div className="radio-btn">
                    <input
                        type="radio"
                        value={formData.transparency}
                        name="rating"
                        checked={rating == 5}
                    />
                     5
                </div>   
          </div>
        </div>
      
          
        </div>
      </form>
    </div>
  );
};

export default Feedback;
