import React from "react";
import aboutUss from "../../images/aboutUss.jpg";

const AboutUs = () => {
  return (
    <div className="flex h-screen">
      {/* Left half */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center">
        <img
          src={aboutUss}
          alt="Company Logo"
          className="max-w-full max-h-full"
        />
      </div>

      {/* Right half */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-t-2 border-gray-800 p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold">About Us</h1>
            </div>

            <div className="text-center">
              <p className="text-lg mb-4">
                At LittleDreamers, we take pride in curating a delightful world
                of toys designed exclusively for kids. Our store presents an
                extensive collection of toys that spark creativity, foster
                learning, and ignite imagination. We understand the importance
                of play in a child's development and strive to offer a diverse
                range of toys that cater to every child's unique interests and
                needs.
              </p>

              <p className="text-lg mb-4">
                With a passion for enriching playtime experiences, our team
                handpicks toys that promise quality, safety, and entertainment.
                From educational wonders to outdoor adventures, from timeless
                classics to modern innovations, LittleDreamers brings forth a
                wonderland of toys that captivate and inspire. Join us on this
                joyful journey as we provide dedicated toys for little dreamers,
                nurturing their growth and happiness through the magic of play.
                Discover the joy of play at LittleDreamers Toy Store.
              </p>
              {/* Add more information as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
