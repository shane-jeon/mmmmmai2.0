import React from "react";

// Define the props for the Results component
interface ResultsProps {
  recipe: string;
  error: string;
  loading: boolean;
}

const Results = ({ recipe, error, loading }: ResultsProps) => {
  if (loading) {
    return <p>Loading your terrible recipe...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h3>Generated Recipe:</h3>
      {recipe ? <p>{recipe}</p> : <p>No recipe generated.</p>}
    </div>
  );
};

export default Results;
