import React from 'react';

//exports a function that renders any validation errors sent from the API
const ErrorsDisplay = ({errors}) => {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => 
                            <li key={i}>{error}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
    
    return errorsDisplay;
}
 
export default ErrorsDisplay;