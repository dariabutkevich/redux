import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import { selectUserEmail, selectUserCreatedAt } from "../redux/user/selectors";
import { connect } from "react-redux";

const About = ({ userEmail, userCreatedAt }) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose flex flex-col justify-center items-center ">
        <h1 className="mt-8">About me</h1>
        {userEmail && <p>Email: {userEmail}</p>}
        {userCreatedAt && (
          <p>
            Date sign up: {moment(userCreatedAt).format("D.M.YYYY HH:mm:ss")}
          </p>
        )}
        <Link to={"/notes"}>
          <button className="mb-8 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 mt-8">
            Go to notes
          </button>
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  userEmail: selectUserEmail(state),
  userCreatedAt: selectUserCreatedAt(state),
});

export default connect(mapStateToProps)(About);
