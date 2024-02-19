import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopItems from "../components/ShopItems";
import { useAuthContext } from "../store/AuthCtx";
import { Link, useParams } from "react-router-dom";
import { array } from "yup";
import IdeaItem from "../components/IdeaItem";

export default function HomePage() {
  const [items, setItems] = useState([]);

  const { userId } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:3000/api/ideas`);
        setItems(resp.data.rows);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl my-6">Istorijos/idėjos</h1>
      <div className="grid grid-cols-1 gap-4">{items.length > 0 && items.map((singleItem) => <IdeaItem key={singleItem.id} item={singleItem} />)}</div>
    </>
  );
}
