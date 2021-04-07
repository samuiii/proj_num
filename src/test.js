import Desmos from "desmos";
import react, { useEffect, useState } from "react"
import { EditableMathField } from "react-mathquill";
import { useLatexContext } from "./latex"
import { Input } from 'antd'
import React from "react";
const AlgebraLatex = require('algebra-latex')
const math = require('mathjs')
// const elt =document.getElementById('calculator');
// var calculator = Desmos.GraphingCalculator(elt,{keypad:false,expressions:false});
export default function Test({ children, input }) {
  // const {latex, setLatex} = useLatexContext();
  const [latex, setLatex] = useState('');
  const [xL, setxL] = useState('');
  const [xR, setxR] = useState('');
  const [errnum, setErrNum] = useState(false);
  const [errtext, setErrtext] = useState(false);
  useEffect(() => {
    console.log(latex);
    if(input == 1){
      const elt = document.getElementById('calculator');
      const calculator = Desmos.GraphingCalculator(elt, { keypad: false, expressions: false });
      calculator.setExpression({ id: '1', latex: latex });
      calculator.setExpression({ id: '2', latex: `x=${xL}`, lineStyle: Desmos.Styles.DASHED });
      try {
        (new AlgebraLatex().parseLatex(latex).toMath())
        math.evaluate((new AlgebraLatex().parseLatex(latex).toMath()), { x: 1 });
        if (latex.search("x") != -1) {
          Number.isFinite(parseFloat(math.evaluate((new AlgebraLatex().parseLatex(latex).toMath()), { x: 1 }))) ? setErrtext(true) : setErrtext(false)
        } else {
          setErrtext(false)
        }
        (Number.isFinite(Number((xL ? xL : "NaN"))))?setErrNum(true):setErrNum(false)
      } catch (e) {
        setErrNum(false);
        setErrtext(false);
      }
      return (() => {
        calculator.destroy();
      })
    }
    else if (input == 2) {
      const elt = document.getElementById('calculator');
      const calculator = Desmos.GraphingCalculator(elt, { keypad: false, expressions: false });
      calculator.setExpression({ id: '1', latex: latex });
      calculator.setExpression({ id: '2', latex: `x=${xL}`, lineStyle: Desmos.Styles.DASHED });
      calculator.setExpression({ id: '3', latex: `x=${xR}`, lineStyle: Desmos.Styles.DASHED });
      
      try {
        (new AlgebraLatex().parseLatex(latex).toMath())
        math.evaluate((new AlgebraLatex().parseLatex(latex).toMath()), { x: 1 });
        if (latex.search("x") != -1) {
          Number.isFinite(parseFloat(math.evaluate((new AlgebraLatex().parseLatex(latex).toMath()), { x: 1 }))) ? setErrtext(true) : setErrtext(false)
        } else {
          setErrtext(false)
        }
        if (Number.isFinite(Number((xL ? xL : "NaN"))) && Number.isFinite(Number((xR ? xR : "NaN")))) {
          if (xL < xR) {
            setErrNum(true)
          } else {
            setErrNum(false)
          }
        } else {
          setErrNum(false);
        }
      } catch (e) {
        setErrNum(false);
        setErrtext(false);
        console.log(e.message);
      }
      return (() => {
        calculator.destroy();
      })
    }
  }, [latex, xL, xR,input])
  useEffect(() => {
    if (input ==1 ){
      return (() => {
        setLatex("");
        setxL("");
        setErrNum(false);
        setErrtext(false);
      })
    }
    else if (input == 2) {
      return (() => {
        setLatex("");
        setxL("");
        setxR("");
        setErrNum(false);
        setErrtext(false);
      })
    }
  }, [children,input])
  if(input==1){
    return (
      <react.Fragment>
        <div className="show">
          <div className="input">
            <EditableMathField latex={latex}
              config={{ autoCommands: 'pi theta sqrt sum nthroot' }}
              onChange={(mathField) => { setLatex(mathField.latex()) }}
              style={{ border: "1px solid #d9d9d9" }}
            />
            <Input value={xL} onChange={(p) => {
              setxL(p.target.value);
            }} placeholder="input x0" />
          </div>
          <div id="calculator" style={{ width: 700, height: 500, textAlign: "center" }}>
          </div>
        </div>
        {
          errnum && errtext && React.cloneElement(children, { xL: xL,fx: latex })
        }
      </react.Fragment>
    );
  }
  else if (input == 2) {
    return (
      <react.Fragment>
        <div className="show">
          <div className="input">
            <EditableMathField latex={latex}
              config={{ autoCommands: 'pi theta sqrt sum nthroot' }}
              onChange={(mathField) => { setLatex(mathField.latex()) }}
              style={{ border: "1px solid #d9d9d9" }}
            />
            <Input value={xL} onChange={(p) => {
              setxL(p.target.value);
            }} placeholder="input xL" />
            <Input value={xR} onChange={(p) => {
              setxR(p.target.value);
            }} placeholder="input xR" />
          </div>
          <div id="calculator" style={{ width: 700, height: 500, textAlign: "center" }}>
          </div>
        </div>
        {
          errnum && errtext && React.cloneElement(children, { xL: xL, xR: xR, fx: latex })
        }
      </react.Fragment>
    );
  }
}
// <Text key="text-math" xL={xL} xR={xR} fx={latex} />