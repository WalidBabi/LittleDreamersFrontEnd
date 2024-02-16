import React, { useState } from "react";
import axios from "axios";

const ChildForm = () => {
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    childGender: "",
    favoritePatterns: [],
    favoriteToys: [],
    learningNeeds: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        // Handle checkbox values
        if (checked) {
          return {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        } else {
          return {
            ...prevData,
            [name]: prevData[name].filter((item) => item !== value),
          };
        }
      } else {
        // Handle non-checkbox values
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace the following URL with your backend endpoint
    const apiUrl = "https://example.com/api/submitChildForm";

    // Send form data to the backend
    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Form submitted successfully!", response.data);
        // You can handle success here, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // You can handle errors here, e.g., show an error message to the user
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 bg-gray-100">
      <div className="max-w-3xl w-full p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Child Information Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Child Information:
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Child's Name:
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Age:
                </label>
                <input
                  type="number"
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">
                Gender (Optional):
              </label>
              <select
                id="childGender"
                name="childGender"
                value={formData.childGender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </fieldset>

          {/* Interests and Preferences Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Interests and Preferences:
            </legend>
            <div className="space-y-8">
              <label className="block text-sm font-medium text-gray-600">
                What are your child's favorite patterns? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="construction"
                    name="favoritePatterns"
                    value="Construction"
                    checked={formData.favoritePatterns.includes("Construction")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Construction</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="logicalThinking"
                    name="favoritePatterns"
                    value="LogicalThinking"
                    checked={formData.favoritePatterns.includes(
                      "LogicalThinking"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Logical Thinking</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="pretendPlay"
                    name="favoritePatterns"
                    value="PretendPlay"
                    checked={formData.favoritePatterns.includes("PretendPlay")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Pretend Play</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="musicalPlay"
                    name="favoritePatterns"
                    value="MusicalPlay"
                    checked={formData.favoritePatterns.includes("MusicalPlay")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Musical Play</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="outdoorPlay"
                    name="favoritePatterns"
                    value="OutdoorPlay"
                    checked={formData.favoritePatterns.includes("OutdoorPlay")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Outdoor Play</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="experimentation"
                    name="favoritePatterns"
                    value="Experimentation"
                    checked={formData.favoritePatterns.includes(
                      "Experimentation"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Experimentation</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="artAndCraft"
                    name="favoritePatterns"
                    value="ArtAndCraft"
                    checked={formData.favoritePatterns.includes("ArtAndCraft")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Art and Craft</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="strategy"
                    name="favoritePatterns"
                    value="Strategy"
                    checked={formData.favoritePatterns.includes("Strategy")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Strategy</span>
                </label>
                {/* Add more checkboxes as needed */}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">
                What types of toys does your child usually enjoy? (Select all
                that apply)
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="puzzle"
                    name="favoriteToys"
                    value="Puzzle"
                    checked={formData.favoriteToys.includes("Puzzle")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Puzzle</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="stuffedAnimals"
                    name="favoriteToys"
                    value="StuffedAnimals"
                    checked={formData.favoriteToys.includes("StuffedAnimals")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Stuffed Animals</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="educationalBoardGame"
                    name="favoriteToys"
                    value="EducationalBoardGame"
                    checked={formData.favoriteToys.includes(
                      "EducationalBoardGame"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Educational Board Game</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="artSupplies"
                    name="favoriteToys"
                    value="ArtSupplies"
                    checked={formData.favoriteToys.includes("ArtSupplies")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Art Supplies</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="musicalInstrument"
                    name="favoriteToys"
                    value="MusicalInstrument"
                    checked={formData.favoriteToys.includes(
                      "MusicalInstrument"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Musical Instrument</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="remoteControlCar"
                    name="favoriteToys"
                    value="RemoteControlCar"
                    checked={formData.favoriteToys.includes("RemoteControlCar")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Remote Control Car</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="scienceKit"
                    name="favoriteToys"
                    value="ScienceKit"
                    checked={formData.favoriteToys.includes("ScienceKit")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Science Kit</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="dollhouse"
                    name="favoriteToys"
                    value="Dollhouse"
                    checked={formData.favoriteToys.includes("Dollhouse")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Dollhouse</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="interactiveLearningTablet"
                    name="favoriteToys"
                    value="InteractiveLearningTablet"
                    checked={formData.favoriteToys.includes(
                      "InteractiveLearningTablet"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Interactive Learning Tablet</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="toyKitchenSet"
                    name="favoriteToys"
                    value="ToyKitchenSet"
                    checked={formData.favoriteToys.includes("ToyKitchenSet")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Toy Kitchen Set</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="outdoorSportsEquipment"
                    name="favoriteToys"
                    value="OutdoorSportsEquipment"
                    checked={formData.favoriteToys.includes(
                      "OutdoorSportsEquipment"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Outdoor Sports Equipment</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="playDoughSet"
                    name="favoriteToys"
                    value="PlayDoughSet"
                    checked={formData.favoriteToys.includes("PlayDoughSet")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Play Dough Set</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="roboticsKit"
                    name="favoriteToys"
                    value="RoboticsKit"
                    checked={formData.favoriteToys.includes("RoboticsKit")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Robotics Kit</span>
                </label>
                {/* Add more checkboxes as needed */}
              </div>
            </div>
          </fieldset>

          {/* Skill or Learning Needs Section */}
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-bold mb-2">
              Skill or Learning Needs:
            </legend>
            <div className="space-y-8">
              <label className="block text-sm font-medium text-gray-600">
                Does your child face any challenges or have specific learning or
                skill needs? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="handEyeCoordination"
                    name="learningNeeds"
                    value="HandEyeCoordination"
                    checked={formData.learningNeeds.includes(
                      "HandEyeCoordination"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Hand-eye coordination</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="problemSolving"
                    name="learningNeeds"
                    value="ProblemSolving"
                    checked={formData.learningNeeds.includes("ProblemSolving")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Problem Solving</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="emotionalDevelopment"
                    name="learningNeeds"
                    value="EmotionalDevelopment"
                    checked={formData.learningNeeds.includes(
                      "EmotionalDevelopment"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Emotional Development</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="criticalThinking"
                    name="learningNeeds"
                    value="CriticalThinking"
                    checked={formData.learningNeeds.includes(
                      "CriticalThinking"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Critical Thinking</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="creativeExpression"
                    name="learningNeeds"
                    value="CreativeExpression"
                    checked={formData.learningNeeds.includes(
                      "CreativeExpression"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Creative Expression</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="coordinationAndRhythm"
                    name="learningNeeds"
                    value="CoordinationAndRhythm"
                    checked={formData.learningNeeds.includes(
                      "CoordinationAndRhythm"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Coordination and Rhythm</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="fineMotorSkills"
                    name="learningNeeds"
                    value="FineMotorSkills"
                    checked={formData.learningNeeds.includes("FineMotorSkills")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Fine Motor Skills</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="scientificCuriosity"
                    name="learningNeeds"
                    value="ScientificCuriosity"
                    checked={formData.learningNeeds.includes(
                      "ScientificCuriosity"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Scientific Curiosity</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="imagination"
                    name="learningNeeds"
                    value="Imagination"
                    checked={formData.learningNeeds.includes("Imagination")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Imagination</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="languageDevelopment"
                    name="learningNeeds"
                    value="LanguageDevelopment"
                    checked={formData.learningNeeds.includes(
                      "LanguageDevelopment"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Language Development</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="socialSkills"
                    name="learningNeeds"
                    value="SocialSkills"
                    checked={formData.learningNeeds.includes("SocialSkills")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Social Skills</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="physicalFitness"
                    name="learningNeeds"
                    value="PhysicalFitness"
                    checked={formData.learningNeeds.includes("PhysicalFitness")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Physical Fitness</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="memoryEnhancement"
                    name="learningNeeds"
                    value="MemoryEnhancement"
                    checked={formData.learningNeeds.includes(
                      "MemoryEnhancement"
                    )}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Memory Enhancement</span>
                </label>
                {/* Add more checkboxes as needed */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="language"
                    name="learningNeeds"
                    value="Language"
                    checked={formData.learningNeeds.includes("Language")}
                    onChange={handleChange}
                  />{" "}
                  <span className="ml-2">Language</span>
                </label>
                {/* Add more checkboxes as needed */}
              </div>
            </div>
          </fieldset>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChildForm;