import React, { useState } from "react";

const FeatchUrl = async ({
  type = "json",
  urls,
  querydata,
  method,
  comeback,
  dataName,
  postdata = null,
  hearder = {},
  failData,
}) => {
  try {
    let meta = document.querySelector('meta[name="csrf-token"]').content;
    //data["format"] = "json";
    let url;
    let queryString;
    let mode;
    if (querydata !== undefined) {
      querydata["format"] = "json";
      let urlValue = Object.entries(querydata).map(([key, val]) => {
        return `${key}=${val}`;
      });
      queryString = urlValue.join("&");
    }

    if (Boolean(queryString)) {
      url = urls + queryString;
      console.log(url);
    } else {
      url = urls;
      console.log(url);
    }
    if (postdata !== null) {
      if (type == "file") {
        // hearder["X-CSRFToken"] = meta;
        mode = "no-cors";
      } else {
        hearder["Accept"] = "application/json";
        hearder["Content-Type"] = "application/json; charset=UTF-8";
        hearder["X-Requested-With"] = "XMLHttpRequest";
        hearder["X-CSRFToken"] = meta;
        if (method === "PUT" || method === "POST" || method === "DELETE") {
          mode = "cors";
        } else {
          mode = "no-cors";
        }
      }
    } else if (method === "DELETE") {
      mode = "cors";
    } else {
      mode = "no-cors";
    }

    const response = await fetch(url, {
      method: method,
      headers: hearder,
      mode: mode,
      body:
        method === "GET"
          ? null
          : type == "file"
          ? postdata
          : JSON.stringify(postdata),
    });
    if (type === "file") {
      if (response.ok) {
        comeback && comeback();
      }
    } else {
      if (response.ok) {
        const data = await response.json();
        comeback && comeback(data);
      }
    }
  } catch (error) {
    failData && failData();
    console.error(`Error ${dataName} data:`, error);
  }
};

export default FeatchUrl;
