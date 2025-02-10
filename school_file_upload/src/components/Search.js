import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Swal from "sweetalert2";
import FeatchUrl from "./FeatchUrl";
import school_list from "../data/school_list.json";
import school_detail_file_list from "../data/school_detail_file_list.json";
import ReactSelect from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import FileUpUrl from "./FileUpUrl";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactPaginate from "./ReactPaginate";
import SchoolFileInfo from "./modals/SchoolFileInfo";
const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#ffffff",
    border: state.isFocused ? "4px solid #6889e4" : "2px solid #ced4da",
    "&:hover": {
      border: "3px solid #b1c5fa", // 鼠标悬停时的边框颜色
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#e2e2e2" : "",
    color: state.isFocused ? "#333333" : "#FFFFFF",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#333333",
    zIndex: 1000, // 尝试将 zIndex 设置得更高
  }),
};
const Search = ({
  is_admin,
  SchoolSelectUrl,
  delFileUrl,
  Uploadfile,
  noAdminGetdata,
  isAdminGetdata,
}) => {
  const [files, setFiles] = useState([]); // 取得多個檔案
  const [Data, setData] = useState([]); // 取得data 資料內容
  const useFile = useRef(null); // 新增資料到 Data
  const thisSchoolName = useRef(null); // 新增資料到 Data
  const [select, setSelect] = useState([]); //  選擇
  const [dataPage, setDataPage] = useState({
    current_page: 0,
    total_page: 0,
  });
  // 篩選值
  const [searchSchoolVal, setSearchoolVal] = useState({
    SchoolName: "",
  });

  useEffect(() => {
    getAllData(is_admin);
  }, [dataPage.current_page]);

  useEffect(() => {
    if (Data.length === 0) {
      setDataPage((prev) => ({
        ...prev,
        current_page: 0,
      }));
    }
  }, [Data]);

  useEffect(() => {
    if (is_admin) {
      FeatchUrl({
        method: "GET",
        urls: SchoolSelectUrl,
        comeback: getSchoolSelect,
        dataName: "getSchoolSelect",
      });
      // getSchoolSelect(school_list); //------------------------select假資料
      function getSchoolSelect(data) {
        data.data.map((item) => {
          setSelect((prevSelect) => [
            ...prevSelect,
            {
              value: item.id,
              label: item.name,
            },
          ]);
        });
      }
      setSelect((prev) => [
        ...prev,
        {
          value: 0,
          label: "全部學校",
        },
      ]);
    }
  }, []);

  // 如果他修改內容但是沒有按搜尋會是它原來的值
  const getAllData = (is_admin) => {
    setLoading(() => true);
    let quarData;
    let thisurl;
    if (is_admin) {
      quarData = {
        current_page: dataPage.current_page,
        id: searchSchoolVal.SchoolName || 0,
      };
      thisurl = isAdminGetdata;
    } else {
      quarData = {
        current_page: dataPage.current_page,
      };
      thisurl = noAdminGetdata;
    }
    FeatchUrl({
      method: "GET",
      urls: thisurl,
      comeback: getData,
      dataName: is_admin ? "作者資料" : "前端資料",
      querydata: quarData,
    });
    // getData(school_detail_file_list); //---------------------------假資料
    function getData(data) {
      setTimeout(() => {
        setLoading(() => false);
      }, 800);
      if (is_admin) {
        setData(data.data.list);
        setDataPage((prev) => ({
          ...prev,
          total_page: data.data.total_page,
        }));
      } else {
        setData(data.data.list);
        setDataPage((prev) => ({
          ...prev,
          total_page: data.data.total_page,
        }));
        thisSchoolName.current = data.data.name;
      }
    }
  };
  const [isSelect, setIsSelect] = useState(false);
  useEffect(() => {
    if (isSelect) {
      if (dataPage.current_page === 0) {
        getAllData(is_admin);
        setIsSelect(false);
      } else {
        setDataPage((prev) => ({
          ...prev,
          current_page: 0,
        }));
        setIsSelect(false);
      }
    }
  }, [isSelect]);

  // 取得搜尋的值
  function handleChangeInputValue(event) {
    setSearchoolVal({
      SchoolName: event.value,
    });
    setIsSelect(true);
  }

  // 取得資料
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileData = Array.from(selectedFiles).map((file, index) => {
      const date = new Date();
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Taipei",
      };
      const formattedDate = date
        .toLocaleString("zh-TW", options)
        .replace(/\//g, "-");
      return {
        name: file.name,
        updated_at: formattedDate,
      };
    });
    useFile.current = fileData;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };
  const [enable, setEnable] = useState(false);
  const [progress, setProgress] = useState(0);

  // 上傳文件
  const handleUpload = () => {
    if (files.length > 5) {
      Swal.fire({
        icon: "error",
        title: "最多上傳5個檔案，總上傳檔案不得超過100MB",
        text: "檔案總和100MB",
        showConfirmButton: false,
        timer: 1000,
      });
      setFiles([]);
      return;
    } else if (files.length > 0) {
      FileUpUrl({
        postdata: files,
        urls: Uploadfile,
        // urls: "http://192.168.0.83/upload_image_test",
        comeback: successData,
        failData: failData,
        progressCallback: progressCallback,
      });
      setEnable(true);
      // successData();
      function successData() {
        Swal.fire({
          icon: "success",
          title: "上傳成功",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        // setData((prevData) => [...prevData, ...useFile.current]);
        setEnable(false);
        if (dataPage.current_page === 0) {
          getAllData(is_admin);
        } else {
          setDataPage((prev) => ({
            ...prev,
            current_page: 0,
          }));
        }
        setProgress(0);
        setFiles([]);
      }
      function progressCallback(progress) {
        setProgress(progress);
      }

      function failData() {
        Swal.fire({
          icon: "error",
          title: "上傳失敗",
          text: "最多上傳5個檔案，總上傳檔案不得超過100MB",
          showConfirmButton: false,
          toast: true,
          timer: 1000,
        });
        setProgress(0);
        setEnable(false);
        setFiles([]);
      }
    }
  };

  // 刪除檔案
  const delFile = (del) => {
    Swal.fire({
      title: "確認刪除?",
      html: "<small class='text-danger'>刪除後無法復原!!</small>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4075b4",
      cancelButtonColor: "#e9967a",
      confirmButtonText: "確認刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        FeatchUrl({
          urls: delFileUrl,
          dataName: "delFile",
          comeback: delData,
          method: "DELETE",
          postdata: { id: del.id },
        });
        // delData({ isSuccess: true }); //-------------------刪除假資料
        function delData(data) {
          if (data.isSuccess) {
            const updatedData = Data.filter((item) => item.id !== del.id);
            setData(updatedData);
          }
        }
      }
    });
  };
  // 一件下載
  function handleAlldownload() {
    FeatchUrl({
      urls: "/admin/download",
      dataName: "一件下載",
      comeback: getFile,
      method: "GET",
    });

    function getFile(data) {
      if (data.isSuccess) {
        const a = document.createElement("a");
        a.href = data.url;
        a.download = "全部檔案資料";
        document.body.appendChild(a);
        a.click();
      } else {
        Swal.fire({
          icon: "error",
          title: "下載失敗",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  }
  const download = (itemid) => {
    const a = document.createElement("a");
    const aUrl = itemid.url;
    a.href = aUrl;
    a.download = itemid.name;
    document.body.appendChild(a);
    a.click();
  };
  const [loading, setLoading] = useState(true);
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setDataPage((prev) => {
      return {
        ...prev,
        current_page: selectedPage,
      };
    });
  };
  return (
    <Container className="main">
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: "0%" }}
        transition={{ duration: 1 }}
        style={{ position: "relative", zIndex: 1000 }}
      >
        <div className="text-center mt-5">
          <h1 style={{ fontWeight: 600 }}>{thisSchoolName.current}</h1>
        </div>
        {progress > 100 || progress == 0 ? null : (
          <ProgressBar animated now={progress} className="mb-3" />
        )}
        <Container>
          <Row className="d-flex align-items-center justify-content-center search_top">
            {is_admin ? (
              <Col sm={12} lg={true}>
                <Row>
                  <Col
                    sm={12}
                    lg={8}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <ReactSelect
                      options={select}
                      className="w-100"
                      styles={customStyles}
                      onChange={handleChangeInputValue}
                      placeholder="學校名稱搜尋..."
                      isDisabled={loading}
                    />
                  </Col>
                  <Col>
                    <SchoolFileInfo title="尚未上傳學校" />
                  </Col>
                  <Col>
                    <Button
                      title="一鍵下載"
                      bg="#92a18d"
                      onClick={handleAlldownload}
                    ></Button>
                  </Col>
                </Row>
              </Col>
            ) : (
              <Col sm={12} lg={true}>
                <Row>
                  <Col className="d-flex align-items-center justify-content-center">
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                      multiple
                      max={5}
                    />
                  </Col>
                  <Col className="d-flex align-items-center ">
                    <Button
                      onClick={handleUpload}
                      disabled={enable}
                      title={enable ? "上傳中..." : "文件上傳"}
                    />
                    <span className="span">
                      最多上傳5個檔案，總上傳檔案不得超過100MB
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
      </motion.div>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <main className="mt-5 aucthon_main ">
          <table className="w-100">
            <thead>
              <tr>
                <th>資料</th>
                <th>上傳時間</th>
                <th>功能</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="text-center">
                  <td colSpan={5} className="p-5">
                    <span className="loader"></span>
                  </td>
                </tr>
              ) : Data && Data.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={5} className="p-5">
                    無資料
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {Data &&
                    Data.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ x: "-20%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "20%" }}
                        transition={{ duration: 0.5 }}
                      >
                        <td>{item.name}</td>
                        <td>{item.updated_at}</td>
                        <td>
                          {is_admin ? null : (
                            <Button
                              title="刪除"
                              onClick={() => delFile(item)}
                            />
                          )}
                          <Button
                            title="下載"
                            bg="#4075b4"
                            onClick={() => download(item)}
                          />
                        </td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </main>
        <br />
        {dataPage.total_page >= 2 && (
          <ReactPaginate
            total_page={dataPage.total_page}
            current_page={dataPage.current_page}
            onPageChange={(e) => handlePageClick(e)}
          />
        )}
      </motion.div>
    </Container>
  );
};

export default Search;
