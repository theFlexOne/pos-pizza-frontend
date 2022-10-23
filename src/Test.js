import { Box } from "@mui/system";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import OnscreenKeyboardForm from "./components/OnscreenKeyboardForm";
import { useFormik } from "formik";

const initialValues = { firstName: "", lastName: "" };
const onSubmit = (formData) => {
  console.log("formData", formData);
};
const Test = () => {
  const [formData, setFormData] = useState(initialValues);
  const handleChange = (e) => {
    const newData = { [e.target.id]: e.target.value };
    setFormData({ ...formData, ...newData });
  };
  const [activeInputId, setActiveInputId] = useState("firstName");
  const formRef = useRef(null);

  const handleKeyTap = (input) => {
    const newData = { [activeInputId]: input };
    setFormData({ ...formData, ...newData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  // const formik = useFormik({ initialValues, onSubmit });
  // console.log("formik", formik);

  useLayoutEffect(() => {
    if (activeInputId) {
      formRef.current.querySelector(`#${activeInputId}`).focus();
    }
  }, [activeInputId]);

  return (
    <OnscreenKeyboardForm
      currentInput={formData[activeInputId]}
      onSubmit={handleSubmit}
      formRef={formRef}
      onKeyTap={handleKeyTap}
    >
      <Box>
        <label htmlFor="firstName"></label>
        <input
          type="text"
          className={`first-name${
            activeInputId === "firstName" ? " active" : ""
          }`}
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onClick={(e) => setActiveInputId(e.target.id)}
        />
      </Box>
      <Box>
        <label htmlFor="lastName"></label>
        <input
          type="text"
          className="last-name"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onClick={(e) => setActiveInputId(e.target.id)}
        />
      </Box>
    </OnscreenKeyboardForm>
  );
};

export default Test;
