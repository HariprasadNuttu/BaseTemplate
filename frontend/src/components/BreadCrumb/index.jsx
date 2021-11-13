import { Route, Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

const routes = [
  { path: '/dashboard', name: "Dashboard" },
];
const BreadCrumb = (props) => {
  return (
    <>
      {routes.map(({ path, name }, key) => (
        <Route
          exact
          path={path}
          key={key}
          render={(props) => {
            const crumbs = routes
              .filter(({ path }) => props.match.path.includes(path))
              .map(({ path, ...rest }) => ({
                path: Object.keys(props.match.params).length
                  ? Object.keys(props.match.params).reduce(
                      (path, param) =>
                        path.replace(`:${param}`, props.match.params[param]),
                      path
                    )
                  : path,
                ...rest,
              }));

            return (
              <>
              <div className="spacer"></div>
              <div className="row">
                <div className="col-12">
                  <Breadcrumb>
                    {/* <Breadcrumb.Item> */}
                    <Link to="/dashboard"> Home</Link> &nbsp;/ &nbsp;
                    {/* </Breadcrumb.Item> */}
                    {crumbs.map(({ name, path }, key) =>
                      key + 1 === crumbs.length ? (
                        <Breadcrumb.Item active>{name} </Breadcrumb.Item>
                      ) : (
                        <>
                          <Breadcrumb.Item key={key} to={path}>
                            <Link to={path}> {name}</Link>
                          </Breadcrumb.Item>
                        </>
                      )
                    )}
                  </Breadcrumb>
                </div>
              </div>
            </>
            );
          }}
        />
      ))}
      {/* <hr /> */}
    </>
  );
};

export default BreadCrumb;
