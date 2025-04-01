import { ActionFunctionArgs, useSubmit, useActionData } from "react-router-dom";
import url from "../assets/data/url.json";
import { useState, useEffect, useRef } from "react";

const UserPhoto = () => {
  const submit = useSubmit();
  const data = useActionData();
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 新增狀態來儲存圖片網址

  useEffect(() => {
    submit(null, { method: "post" });
  }, []);

  useEffect(() => {
    if (data && data.url) {
      setImageUrl(data.url);
    }
  }, [data]);

  //   const handleDownload = () => {
  //     if (imageUrl) {
  //       const link = document.createElement("a");
  //       link.href = imageUrl;
  //       link.download = "user_image.jpg";
  //       link.click();
  //     }
  //   };

  if (!imageUrl) {
    return <div>Loading...</div>; // 在圖片加載前顯示Loading
  }

  return (
    <main className="flex flex-col gap-10 bg-MineBgColor min-h-screen ">
      <img
        src="/static/images/logo.png"
        alt="logo"
        className="w-3/12 my-5 mx-auto"
        ref={imageRef}
      />
      <div className="card bg-base-100 my-auto shadow-sm ">
        <figure className="bg-MineBgColor ">
          <img src={imageUrl} alt="user image" />
        </figure>
        <div className="card-body items-center bg-MineBgColor ">
          <h2 className="card-title text-white">長按壓下載即可下載圖片</h2>
          {/* <div className="card-actions justify-end">
            <a
              href={imageUrl}
              className="btn btn-primary"
              onClick={handleDownload}
            >
              常案
            </a>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export async function Action({ params }: ActionFunctionArgs) {
  const id = params.id;
  const test = url.test ? url.host : "";
  const path = test + url.port.image;
  const image = await fetch(path, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!image.ok) {
    console.log("錯誤");
    return null;
  }

  const data = await image.json(); // 等待fetch結果
  return data;
}

export default UserPhoto;
