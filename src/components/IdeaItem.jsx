import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtx";

export default function IdeaItem({ item }) {
  const { role } = useAuthContext();
  const { id, title, content, img, need, collected, person, accepted } = item;
  const navigate = useNavigate();
  async function activHandler(id) {
    try {
      const res = await axios.put("http://localhost:3000/api/admin/acceptIdea/" + id);
      console.log(res.data);
      toast.success(res.data.msg);
      navigate("/ideasList");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border-2 border-gray-400 p-4 flex gap-4">
      <img className="w-[200px] h-[200px]" src={img} alt="" />
      <div>
        {role === "admin" && (
          <div>
            {title}({accepted === 1 ? <span className="text-green-400">Aktyvus</span> : <span className="text-yellow-400">Neaktyvus</span>})
          </div>
        )}
        {role !== "admin" && <div>{title}</div>}
        {/* <div>{title}</div> */}
        <p className="my-4">{content}</p>
        <div>Norimą surinkti sumą: {need}</div>
        <div>Likusią iki tikslo sumą: {collected}</div>
        <div>Autorius: {person}</div>

        {role === "admin" && accepted !== 1 && (
          <button className="bg-blue-500 p-2" onClick={() => activHandler(id)}>
            Aktyvuoti
          </button>
        )}
      </div>
    </div>
  );
}
