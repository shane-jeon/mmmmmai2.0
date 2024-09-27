import { useState } from "react";
import Form from "@/components/Form";
import Result from "@/components/Result"; // Assuming this is the component where results are displayed
import Header from "@/components/Header";

const Home = () => {
  const [recipe, setRecipe] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Define loading state here

  return (
    <div>
      <Header />
      <div className="flex min-h-screen flex-col justify-center p-5 md:flex-row">
        <section id="left-section" className="w-full p-5 md:w-2/5">
          <h1 className="mb-24 mt-14 text-center text-3xl">Instructions</h1>
          <Form
            setRecipe={setRecipe}
            setImage={setImage}
            setError={setError}
            setLoading={setLoading}
          />
        </section>
        <section
          id="right-section"
          className="w-full bg-[#F4F4F4] p-5 md:w-2/5">
          <Result
            recipe={recipe}
            image={image}
            error={error}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
