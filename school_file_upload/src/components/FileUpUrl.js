const FileUpUrl = async ({
  urls,
  postdata,
  progressCallback,
  comeback,
  failData,
}) => {
  try {
    let meta = document.querySelector('meta[name="csrf-token"]').content;
    let url = urls;

    const formData = new FormData();
    postdata.forEach((file, index) => {
      formData.append(`${file.name}${index}`, file);
    });

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        progressCallback && progressCallback(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        comeback && comeback(xhr.responseText);
      } else {
        failData && failData();
      }
    };

    xhr.onerror = () => {
      failData && failData();
    };

    xhr.open("POST", url, true); // 设置为异步请求
    xhr.setRequestHeader("X-CSRFToken", meta);
    xhr.send(formData);
  } catch (error) {
    failData && failData();
    console.error("Error uploading file:", error);
  }
};

export default FileUpUrl;
