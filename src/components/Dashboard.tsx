import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

function Dashboard({ isLoggedIn }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

export default Dashboard;
