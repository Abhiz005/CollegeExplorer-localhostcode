import React, { useEffect } from "react";

const PipeAnimation = () => {
  useEffect(() => {
    const pipeCount = 30;
    const pipePropCount = 8;
    const pipePropsLength = pipeCount * pipePropCount;
    const turnCount = 8;
    const TO_RAD = Math.PI / 180;
    const turnAmount = (360 / turnCount) * TO_RAD;
    const turnChanceRange = 58;
    const baseSpeed = 0.5;
    const rangeSpeed = 1;
    const baseTTL = 100;
    const rangeTTL = 300;
    const baseWidth = 2;
    const rangeWidth = 4;
    const baseHue = 180;
    const rangeHue = 60;
    const backgroundColor = "hsla(150,80%,1%,1)";
    const TAU = Math.PI * 2;
    const HALF_PI = Math.PI / 2;

    let container;
    let canvas;
    let ctx;
    let center;
    let tick;
    let pipeProps;

    function setup() {
      createCanvas();
      resize();
      initPipes();
      draw();
    }

    function createCanvas() {
      container = document.querySelector(".content--canvas");
      canvas = {
        a: document.createElement("canvas"),
        b: document.createElement("canvas"),
      };
      canvas.b.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
       
      `;
      container.appendChild(canvas.b);
      ctx = {
        a: canvas.a.getContext("2d"),
        b: canvas.b.getContext("2d"),
      };
      center = [];
      tick = 0;
    }

    function resize() {
      const { innerWidth, innerHeight } = window;
      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;
      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;
      center[0] = 0.5 * canvas.a.width;
      center[1] = 0.5 * canvas.a.height;
    }

    function initPipes() {
      pipeProps = new Float32Array(pipePropsLength);
      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        initPipe(i);
      }
    }

    function initPipe(i) {
      const x = Math.random() * canvas.a.width;
      const y = center[1];
      const direction = Math.random() < 0.5 ? HALF_PI : TAU - HALF_PI;
      const speed = baseSpeed + Math.random() * rangeSpeed;
      const life = 0;
      const ttl = baseTTL + Math.random() * rangeTTL;
      const width = baseWidth + Math.random() * rangeWidth;
      const hue = baseHue + Math.random() * rangeHue;

      pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i);
    }

    function draw() {
      updatePipes();
      render();
      window.requestAnimationFrame(draw);
    }

    function updatePipes() {
      tick++;
      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        updatePipe(i);
      }
    }

    function updatePipe(i) {
      const x = pipeProps[i];
      const y = pipeProps[i + 1];
      let direction = pipeProps[i + 2];
      const speed = pipeProps[i + 3];
      let life = pipeProps[i + 4];
      const ttl = pipeProps[i + 5];
      const width = pipeProps[i + 6];
      const hue = pipeProps[i + 7];

      drawPipe(x, y, life, ttl, width, hue);

      life++;
      const newX = x + Math.cos(direction) * speed;
      const newY = y + Math.sin(direction) * speed;
      const turnChance =
        !(tick % Math.round(Math.random() * turnChanceRange)) &&
        (!(Math.round(x) % 6) || !(Math.round(y) % 6));
      const turnBias = Math.random() < 0.5 ? -1 : 1;
      direction += turnChance ? turnAmount * turnBias : 0;

      pipeProps.set([newX, newY, direction, speed, life, ttl, width, hue], i);

      if (life > ttl) {
        initPipe(i);
      }
    }

    function drawPipe(x, y, life, ttl, width, hue) {
      ctx.a.save();
      ctx.a.strokeStyle = `hsla(${hue},75%,50%,${
        fadeInOut(life, ttl) * 0.125
      })`;
      ctx.a.beginPath();
      ctx.a.arc(x, y, width, 0, TAU);
      ctx.a.stroke();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function fadeInOut(life, ttl) {
      const halfTTL = ttl / 2;
      return Math.sin((Math.PI * life) / ttl) ** 2;
    }

    function render() {
      ctx.b.save();
      ctx.b.fillStyle = backgroundColor;
      ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
      ctx.b.restore();

      ctx.b.save();
      ctx.b.filter = "blur(12px)";
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();

      ctx.b.save();
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    window.addEventListener("resize", resize);
    setup();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <div className="content--canvas" />;
};

export default PipeAnimation;
