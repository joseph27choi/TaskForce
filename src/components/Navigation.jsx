import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate();

  const onSimpleExample = () => {
    navigate("/destination");
  };

  const withDataExample = () => {
    navigate("/destination", {
      state: { name: "junha", gender: "male" },
    });
  };

  return (
    <>
      <div>
        <button onClick={onSimpleExample}>
          GO TO DESTINATION PAGE WITH NOTHING ON IT
        </button>
        <button onClick={withDataExample}>
          GO TO DESTINATION PAGE WITH DATA
        </button>
      </div>
    </>
  )
}

export default Navigation