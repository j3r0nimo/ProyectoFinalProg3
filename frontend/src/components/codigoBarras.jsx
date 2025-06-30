import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function CodigoBarras({ valor }) {
  const svgRef = useRef();

  useEffect(() => {
    if (valor) {
      JsBarcode(svgRef.current, valor.toString(), {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
      });
    }
  }, [valor]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default CodigoBarras;
