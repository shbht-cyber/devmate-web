import React from "react";

const SkillsSection = ({ form, setForm }) => {
  const addSkill = () => {
    const skill = prompt("Enter skill:");
    if (skill.trim() !== "") {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Skills</h3>

      <div className="flex flex-wrap gap-2 items-center cursor-pointer">
        {form.skills.map((skill, index) => (
          <div
            key={index}
            className="relative badge badge-info py-3 px-4 text-white flex items-center h-10"
          >
            {skill}

            <button
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer"
              onClick={() => {
                const updatedSkills = form.skills.filter((_, i) => i !== index);
                setForm({ ...form, skills: updatedSkills });
              }}
            >
              ✕
            </button>
          </div>
        ))}

        <button className="btn btn-outline btn-sm" onClick={addSkill}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
