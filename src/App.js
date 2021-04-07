
import './App.css';
import react, { useState, useEffect } from "react";
import { Link, Route, Switch,useLocation} from "react-router-dom"
import { Layout, Menu } from 'antd'
import Test from "./test"
import {addStyles} from "react-mathquill";
import Bisection from "./method/bisection"
import Falseposition from "./method/Falseposition"
import Onepoint from "./method/onepoint"

addStyles();
const { Header, Footer, Content } = Layout;
const {SubMenu} = Menu;

function App() {
  const location = useLocation();
  const [current,setCurrent] = useState("/");
  useEffect(()=>{
    setCurrent(location.pathname);
  },[location])
  return (<Layout className="layout">
    <Header>
      {/* <div className="logo" /> */}
      <Menu mode="horizontal" triggerSubMenuAction="click" onClick={(e)=>{setCurrent(e.key)}} selectedKeys={current}>
        <SubMenu key="Menu1" title="Root of Equation" >
          <Menu.Item key="/Bisection">
          <Link to="/Bisection" >Bisection</Link>
          </Menu.Item>
          <Menu.Item key="/False_Position">
          <Link to="/False_Position" >False Position</Link>
          </Menu.Item>
          <Menu.Item key="/One_Point">
          <Link to="/One_Point" >One Point</Link>
          </Menu.Item>
          <Menu.Item key="/Taylor">
          <Link to="/Taylor" >Taylor</Link>
          </Menu.Item>
          <Menu.Item key="/Newton_Rhapson">
          <Link to="/Newton_Rhapson" >Newton Rhapson</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Menu2" title="Linear Algebra">
         <Menu.Item key="/Cramer" >
          <Link to="/Cramer" >Cramer</Link>
          </Menu.Item>
          <Menu.Item key="/Gauss_Elimination">
          <Link to="/Gauss_Elimination" >Gauss Elimination</Link>
          </Menu.Item>
          <Menu.Item key="/Gauss_Jordan">
          <Link to="/Gauss_Jordan" >Gauss Jordan</Link>
          </Menu.Item>
          <Menu.Item key="/LU_Decomposition">
          <Link to="/LU_Decomposition" >LU Decomposition</Link>
          </Menu.Item>
          <Menu.Item key="/Jacobi">
          <Link to="/Jacobi" >Jacobi</Link>
          </Menu.Item>
          <Menu.Item key="/Gauss_seidel">
          <Link to="/Gauss_seidel" >Gauss seidel</Link>
          </Menu.Item>
          <Menu.Item key="/conjugate_gradient">
          <Link to="/conjugate_gradient" >Conjugate Gradient</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Switch>
        <Route path="/Bisection">
          Bisection
          <div className="site-layout-content">
          <Test input={2}>
            <Bisection />
          </Test>
          </div>
        </Route>
        <Route path="/False_Position">
          False Position
          <div className="site-layout-content">
          <Test input={2}>
            <Falseposition />
            </Test>
          </div>
        </Route>
        <Route path="/One_Point">
        One Point
        <div className="site-layout-content">
        <Test input={1}>
          <Onepoint />
        </Test>
        </div>
        </Route>
        <Route path="/Jacobi">
        Jacobi
        </Route>
      </Switch>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>)
}
export default App;