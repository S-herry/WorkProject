import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import FeatchUrl from "../FeatchUrl";
import allUrl from "../../data/urls/allUrl.json";
import school_check from "../../data/school_check.json";

const SchoolFileInfo = ({ title }) => {
  const [lgShow, setLgShow] = useState(false);
  const [key, setKey] = useState("home");
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (lgShow) {
      FeatchUrl({
        urls: allUrl.school.getSchoolFileInfo,
        dataName: "尚未上傳學校",
        comeback: getData,
        method: "GET",
      });
      //   getData(school_check); // -------------假資料
      function getData(data) {
        setdata(data.data);
      }
    }
  }, [lgShow]);

  return (
    <>
      <Button onClick={() => setLgShow(true)} title={title} bg="#326161" />
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#87b4c9", color: "#ffffff" }}
        >
          <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="home" title="尚未上傳學校"></Tab>

            <Tab eventKey="profile" title="已上傳學校">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>已上傳完成學校</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <td>3</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs> */}
          {data.length === 0 && (
            <Card className="text-center p-3">都已完成!!!</Card>
          )}
          <Table striped bordered hover>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SchoolFileInfo;
