import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery, setMinMax } from "@/redux/jobSlice";

const filterData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary(In LPA)",
    array: ["0-20", "20-30", "30-50"], // In Lakhs Per Annum
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    const isSalary = selectedValue.includes("-") && selectedValue.match(/\d+/g);

    if (isSalary) {
      const [min, max] = selectedValue.split("-").map(Number);
      dispatch(setMinMax({ min, max }));
      dispatch(setSearchedQuery(""));
    } else {
      dispatch(setSearchedQuery(selectedValue));
      dispatch(setMinMax({ min: 0, max: Infinity }));
    }
  }, [selectedValue]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg transition-all">
      <h1 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">
        🎯 Filter Jobs
      </h1>
      <hr className="mb-4 border-gray-300 dark:border-gray-700" />
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-6"
      >
        {filterData.map((section, index) => (
          <div key={index} className="space-y-2">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {section.fitlerType}
            </h2>
            {section.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              const isSalary = section.fitlerType
                .toLowerCase()
                .includes("salary");
              const [min, max] = item.split("-");
              const label = isSalary ? `${min} LPA - ${max} LPA` : item;

              return (
                <div
                  key={itemId}
                  className="flex items-center gap-2 pl-2 py-1 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition"
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="w-4 h-4 border-gray-400 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor={itemId}
                    className="cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {label}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
