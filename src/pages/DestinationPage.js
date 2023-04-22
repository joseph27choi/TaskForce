import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DestinationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const onBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {state ? (
        <p>
          name: {state.name} / gender: {state.gender}
        </p>
      ) : (
        <h2>No Data</h2>
      )}
      <button onClick={onBack}>Back to Previous</button>
    </div>
  )
}

export default DestinationPage