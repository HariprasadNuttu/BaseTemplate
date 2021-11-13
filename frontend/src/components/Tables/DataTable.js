import React, { useState, useEffect } from "react";
import { Row, Table, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";
const DataTable = (props) => {
  // const { header, data } = props;
  const [header, setHeader] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [nestedHeader] = useState(props.nestedHeader || []);
  useEffect(() => {
    setHeader(props.header);
  }, [props.header]);
  useEffect(() => {
    setTableData(props.data);
  }, [props.data]);
  const renderRowDataIcons = (key, data) => {
    switch (key) {
      case "status":
        if (data === "Active") {
          return (
            <i
              className="fa fa-circle"
              aria-hidden="true"
              style={{ color: "#39ff69", fontSize: "10px" }}
            ></i>
          );
        }else if (data === 'Awaiting for Approval' || data === 'Pending'){
          return (
            <i
              className="fa fa-circle"
              aria-hidden="true"
              style={{ color: "#ffdd02", fontSize: "10px" }}
            ></i>
          );
          
        } else if (data === 'Approved' || data === 'Recieved'){
          return (
            <i
              className="fa fa-circle"
              aria-hidden="true"
              style={{ color: "#39ff69", fontSize: "10px" }}
            ></i>
          );
        } else {
          return (
            <i
              className="fa fa-circle"
              aria-hidden="true"
              style={{ color: "#ff6060", fontSize: "10px" }}
            ></i>
          );
        }
      default:
        return "";
    }
  };

  const renderHeaderIcons = (icon) => {
    if (icon) {
      return <i className={icon} aria-hidden="true"></i>;
    }
    return "";
  };

  const tableFormat = (
    <>
      <thead style={{ backgroundColor: "#C4C4C4" }}>
        <tr>
          {header.map(({ key, name, requiredActions, icon }, index) => (
            <>
              {name === "Action" || name === "Audit" ? (
                <>
                  <th
                    scope="col"
                    colSpan={requiredActions.length}
                    style={{ padding: "10px 0px 10px 0px" }}
                    className="text-center"
                    key={index}
                  >
                    {name}
                  </th>
                </>
              ) : (
                <>
                  <th
                    scope="col"
                    style={{ padding: "10px 0px 10px 0px" }}
                    className="text-center"
                    // rowSpan={nestedHeader.length}
                    key={index}
                  >
                    {renderHeaderIcons(icon)} &nbsp;{name}
                  </th>
                </>
              )}
            </>
          ))}
        </tr>
        <tr>
          {nestedHeader.map((nestedHeaderObj, index) => (
            <>
              <th className="text-center">{nestedHeaderObj}</th>
            </>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map((obj, dataIndex) => (
          <>
            <tr key={dataIndex}>
              {header.map(({ key, name, requiredActions }, index) => (
                <>
                  {name === "Action" || name === "Audit" ? (
                    <>
                      {requiredActions &&
                        requiredActions.map(
                          (
                            { actionKey, icon, handleAction, dataKey },
                            rowRequiredActionIndex
                          ) => (
                            <>
                              <td
                                // scope="col"
                                className={
                                  dataKey
                                    ? `text-center ${dataKey}-${obj[dataKey]
                                        .split(" ")
                                        .join("")}`
                                    : ""
                                }
                                key={rowRequiredActionIndex}
                              >
                                {" "}
                                {actionKey ? (
                                  <>
                                    <span
                                      className={`${icon}`}
                                      title={actionKey}
                                      onClick={() => {
                                        handleAction(obj.id);
                                      }}
                                    >
                                      {" "}
                                    </span>
                                  </>
                                ) : (
                                  <>{obj[`${dataKey}`]}</>
                                )}{" "}
                              </td>
                            </>
                          )
                        )}
                    </>
                  ) : (
                    <>
                      <td
                        // scope="col"
                        className={`text-center ${key}-${ isNaN(obj[key]) ? obj[key]
                          .split(" ")
                          .join("") : `${key}-${parseInt(obj[key])} text-center`}`}
                        key={index}
                      >
                        {requiredActions ? (
                          <>
                            {requiredActions &&
                              requiredActions.map(
                                (
                                  { actionKey, icon, handleAction, url },
                                  actionIndex
                                ) => (
                                  <>
                                    <span
                                      className={`${icon}`}
                                      title={actionKey}
                                      onClick={handleAction}
                                    >
                                      {" "}
                                      {url ? (
                                        <>
                                          <NavLink
                                            to={url + "/" + obj.id}
                                            className="dropdown-item"
                                          >
                                            <span className="title">
                                              {obj[`${key}`]}
                                            </span>
                                          </NavLink>
                                        </>
                                      ) : (
                                        <>{obj[`${key}`]}</>
                                      )}{" "}
                                    </span>
                                  </>
                                )
                              )}
                          </>
                        ) : (
                          <>
                            {renderRowDataIcons(key, obj[`${key}`])} &nbsp;
                            {obj[`${key}`]}
                          </>
                        )}
                      </td>
                    </>
                  )}
                </>
              ))}
            </tr>
          </>
        ))}
      </tbody>
    </>
  );
  return (
    <Row>
      <Col xl={12}>
        {props.tableType === "Stripped" ? (
          <>
            <Table responsive hover striped className="m-0 data-table-shadow">
              {tableFormat}
            </Table>
          </>
        ) : (
          <>
            <Table responsive className="m-0 data-table-shadow">
              {tableFormat}
            </Table>
          </>
        )}
      </Col>
    </Row>
  );
};

export default DataTable;
