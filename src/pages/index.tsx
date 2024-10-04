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
    <div className="mx-3 md:mx-8">
      <Header />

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <section id="left-section" className="lg:w-1/2">
          <h1 className="my-8 text-center text-3xl lg:mb-14 lg:mt-14">
            Instructions
          </h1>
          <Form
            setRecipe={setRecipe}
            setImage={setImage}
            setError={setError}
            setLoading={setLoading}
          />
        </section>

        <section id="right-section" className="lg:mx-16 lg:w-1/2">
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
