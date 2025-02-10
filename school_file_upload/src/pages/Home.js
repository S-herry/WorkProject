import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import allUrl from "../data/urls/allUrl.json";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ is_admin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  useEffect(() => {
    if (is_admin && currentUrl === "/") {
      navigate("/admin");
    } else if (!is_admin && currentUrl === "/admin") {
      navigate("/");
    }
  }, [is_admin]);

  return (
    <Search
      is_admin={is_admin}
      SchoolSelectUrl={allUrl.school.listSelect}
      SearchSchoolUrl={allUrl.school.searchSchool}
      Uploadfile={allUrl.school.uploadFile}
      noAdminGetdata={allUrl.school.noAdmin}
      isAdminGetdata={allUrl.school.isAdmin}
      delFileUrl={allUrl.school.DelFile}
      downloadUrl={allUrl.school.downloadUrl}
    />
  );
};

export default Home;
