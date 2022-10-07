import { redirect } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

function Dashboard({ isLoggedIn }: Props) {
  if (!isLoggedIn) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

export default Dashboard;
