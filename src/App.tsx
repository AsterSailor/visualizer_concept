import "./styles.css";
import { useState } from "react";
import { useRef, useEffect } from "react";

let initialList: number[] = [0, 1, 4, 9];
let initialVector: string[] = ["lemon", "pie", "twig"];

let rosieVec: string[] = ['r','o','s','e']

let listObj: {
  type: any;
  value: any;
} = {
  type: "list",
  value: initialList,
};

let vecObj: {
  type: any;
  value: any;
} = {
  type: "vector",
  value: initialVector,
};

let rosieObj: {
  type: any;
  value: any;
} = {
  type: "vector",
  value: rosieVec,
};

let miniList: any[] = [2, rosieObj, rosieObj];

let miniListObj: {
  type: any;
  value: any;
} = {
  type: "list",
  value: miniList,
};

let nestedVec: any[] = [miniListObj, 4, miniListObj, 7];

let nestedVecObj: {
  type: any;
  value: any;
} = {
  type: "vector",
  value: nestedVec,
};

let initialRows: {
  name: string;
  value: any;
}[] = [
  { name: "x", value: 7000 },
  { name: "y", value: 4 },
  { name: "num_list", value: listObj },
  { name: "z", value: 8 },
  { name: "step", value: nestedVecObj },
  { name: "str_vec", value: vecObj },
];


export function arrow(
  ctx: CanvasRenderingContext2D,
  x_val: number,
  y_val: number,
  dir: string,
  len: number
) {
  if (dir == "horizontal") {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val, y_val);
    ctx.lineTo(x_val + len, y_val);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val + len, y_val);
    ctx.lineTo(x_val + len - 7, y_val - 6);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val + len, y_val);
    ctx.lineTo(x_val + len - 7, y_val + 6);
    ctx.stroke();
  } else if (dir == "vertical") {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val, y_val);
    ctx.lineTo(x_val, y_val + len);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val, y_val + len);
    ctx.lineTo(x_val - 6, y_val + len - 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x_val, y_val + len);
    ctx.lineTo(x_val + 6, y_val + len - 7);
    ctx.stroke();
  }
}

export function list(
  ctx: CanvasRenderingContext2D,
  lst: any[],
  x_val: number,
  y_val: number
) {
  let count = lst.length;
  lst.forEach((e: any, i: number) => {
    ctx.strokeRect(x_val + 120 * i, y_val, 40, 40);
    ctx.strokeRect(x_val + 40 + 120 * i, y_val, 30, 40);
    ctx.beginPath();
    ctx.ellipse(x_val + 120 * i + 20, y_val + 20, 4, 4, 0, 0, 7);
    ctx.fill();
    if (typeof e === "object") {
      if (e.type === "list") {
        list(ctx, e.value, x_val + 120 * i + 13, y_val + 57 + 40*count);
      } else if (e.type === "vector") {
        vector(ctx, e.value, x_val + 120 * i + 13, y_val + 57 + 40*count);
      }
    } else {
      ctx.fillText(`${e}`, x_val + 120 * i + 13, y_val + 57 + 40*count);
    }

    // draws dot and arrow to next list element
    if (i !== lst.length - 1) {
      ctx.beginPath();
      ctx.ellipse(x_val + 120 * i + 55, y_val + 20, 4, 4, 0, 0, 7);
      ctx.fill();
      arrow(ctx, x_val + 120 * i + 56, y_val + 20, "horizontal", 57);
    } else {
      // draws the dash representing a null pointer
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(x_val + 40 + 120 * i, y_val);
      ctx.lineTo(x_val + 70 + 120 * i, y_val + 40);
      ctx.stroke();
    }
    arrow(ctx, x_val + 120 * i + 20, y_val + 20, "vertical", 10 + 40 * count);
    count--;
  });
}

export function vector(
  ctx: CanvasRenderingContext2D,
  vec: any[],
  x_val: number,
  y_val: number
) {
  let count = vec.length;
  vec.forEach((e: any, i: number) => {
    let str_e = `${e}`;
    let str_i = `${i}`;

    ctx.font = "12px serif";
    ctx.fillText(str_i, x_val + 40 * i, y_val - 3);
    ctx.font = "24px courier";
    ctx.strokeRect(x_val + 40 * i, y_val, 40, 40);
    ctx.beginPath();
    ctx.ellipse(x_val + 40 * i + 20, y_val + 20, 4, 4, 0, 0, 7);
    ctx.fill();
    if (typeof e === "object") {
      if (e.type === "list") {
        list(ctx, e.value, x_val + 40 * i + 13, y_val + 37 + 40 * count);
      } else if (e.type === "vector") {
        vector(ctx, e.value, x_val + 40 * i + 13, y_val + 37 + 40 * count);
      }
    } else {
      ctx.fillText(str_e, x_val + 40 * i + 13, y_val + 57 + 40 * count);
    }
      arrow(ctx, x_val + 40 * i + 20, y_val + 20, "vertical", 10 + 40*count);
      count--;
  });
}

export function environment(ctx: CanvasRenderingContext2D, rows: any[]) {
  let buffer = 0;
  rows.forEach((e, i) => {
    ctx.strokeRect(7, 7 + i * 45 + buffer, 26 + 16 * e.name.length, 40);

    arrow(ctx, 16 * e.name.length + 20, 26 + i * 45 + buffer, "horizontal", 57);

    ctx.font = "24px courier";

    ctx.fillText(`${e.name}`, 13, 32 + i * 45 + buffer);
    if (e.value.type === "list") {
      list(ctx, e.value.value, 16 * e.name.length + 88, 7 + i * 45 + buffer);
      buffer += 40*e.value.length;
    } else if (e.value.type === "vector") {
      vector(ctx, e.value.value, 16 * e.name.length + 88, 20 + i * 45 + buffer);
      buffer += 5340*e.value.length;
    } else {
      ctx.fillText(`${e.value}`, 16 * e.name.length + 88, 32 + i * 45 + buffer);
    }
  });
}

export function Canvas(props: { width: number; height: number; rows: any[] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    //@ts-expect-error
    const ctx = canvas.getContext("2d");
    const rows = props.rows;
    ctx.textRendering = "geometricPrecision";

    environment(ctx, rows);
  }, []);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}

export default function Test() {
  const [rows, setRows] = useState(initialRows);

  // function createRowVar(name: string, value: any) {
  //   return { name, value };
  // }

  // function handleRowAdd(name: string, value: any) {
  //   return rows.concat({ name: name, value: value });
  // }

  const [list, setList] = useState(initialList);

  // function handleListAdd(object: any) {
  //   return list.concat(object);
  // }

  return (
    <div>
      <b>Scamper</b>
      <Canvas width={2000} height={2000} rows={rows} />
    </div>
  );
}
