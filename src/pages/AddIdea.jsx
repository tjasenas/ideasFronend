import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/Ul/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddIdea() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "Pavadinimas2",
      content: "content",
      img: "https://www.diena.lt/sites/default/files/styles/800x600/public/Vilniausdiena/Vartotoju%20zona/Erika%20Mick%C5%ABnait%C4%97/99_3_44.jpg?itok=Z4fIFhCE",
      need: 30,
      person: "Tomas",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Laukelis yra būtinas"),
      content: Yup.string().required("Laukelis yra būtinas"),
      img: Yup.string().required("Laukelis yra būtinas"),
      need: Yup.number().required("Laukelis yra būtinas"),
      person: Yup.string().required("Laukelis yra būtinas"),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      submitHandler(values);
    },
  });

  async function submitHandler(data) {
    try {
      const res = await axios.post("http://localhost:3000/api/addIdea", data);
      //   login(res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl my-6">Prisijungimas</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField id="title" label="Pavadinimas" formik={formik} placeholder="email" />
        </div>
        <div className="mb-4">
          <InputField id="content" label="Aprašymas" textarea={true} formik={formik} placeholder="Aprašymas" />
        </div>
        <div className="mb-4">
          <InputField id="img" label="Nuotrauka" type="text" formik={formik} placeholder="Nuotrauka" />
        </div>
        <div className="mb-4">
          <InputField id="need" label="Kiek norite surinkti" type="number" formik={formik} placeholder="pvz:200eur" />
        </div>
        <div className="mb-4">
          <InputField id="person" label="Vardas" type="text" formik={formik} placeholder="Vardas" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Pridėti
        </button>
      </form>
    </>
  );
}
