var objectsToDraw = [];
var objects = [];
var createdElements = 1;

const { gl, meshProgramInfo } = initializeWorld();

const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(
  gl,
  10,
  12,
  6
);
const coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(
  gl,
  10,
  0,
  20,
  12,
  1,
  true,
  false
);
const cylinderBufferInfo = flattenedPrimitives.createCylinderBufferInfo(
  gl,
  7,
  13,
  14,
  12
);

const cubeVAO = twgl.createVAOFromBufferInfo(
  gl,
  meshProgramInfo,
  cubeBufferInfo
);

const sphereVAO = twgl.createVAOFromBufferInfo(
  gl,
  meshProgramInfo,
  sphereBufferInfo
);

const coneVAO = twgl.createVAOFromBufferInfo(
  gl,
  meshProgramInfo,
  coneBufferInfo
);

const cylinderVAO = twgl.createVAOFromBufferInfo(
  gl,
  meshProgramInfo,
  cylinderBufferInfo
);

const addElement = async (elementType) => {
  const element = {
    name: `Elemento ${createdElements}`,
    position: createdElements,
    uniforms: {
      u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
      u_matrix: m4.identity(),
    },
    rotation: {
      x: degToRad(Math.floor(Math.random() * 50)),
      y: degToRad(Math.floor(Math.random() * 50)),
      z: degToRad(Math.floor(Math.random() * 50)),
    },
    translation: {
      x: Math.floor(Math.random() * 2) > 0 ? Math.floor(Math.random() * 300) : Math.floor(Math.random() * -300),
      y: Math.floor(Math.random() * 2) > 0 ? Math.floor(Math.random() * 300) : Math.floor(Math.random() * -300),
      z: Math.floor(Math.random() * 2) > 0 ? Math.floor(Math.random() * 50) : Math.floor(Math.random() * -50),
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    isOrbiting: false,
    Axys: "x",
    Remover: () => {
      const elementTarget = objects.indexOf(element); //ver se no vetor de objetos tem um elemento igual, e retorna o index
      if (parseInt(config.elementTarget) === element.position) {
        config.elementTarget = "none";
      }

      objects = objects.filter((object, index) => index !== elementTarget);
      objectsToDraw = objectsToDraw.filter(
        (object, index) => index !== elementTarget
      );

      config.elements = objects?.map((elem) => elem.position);
      config.elementGui = 1;
      addGuiElement();
    },
  };

  objects.push(element);
  if (!elementType) {
    //se não tiver conteúdo
    const model = Math.floor(Math.random() * 4) + 1; //random de 1 a 4
    switch (model) {
      case 1:
        var object = {
          programInfo: meshProgramInfo,
          bufferInfo: cubeBufferInfo,
          vertexArray: cubeVAO,
          uniforms: element.uniforms,
        };
        objectsToDraw.push(object);
        break;

      case 2:
        var object = {
          programInfo: meshProgramInfo,
          bufferInfo: sphereBufferInfo,
          vertexArray: sphereVAO,
          uniforms: element.uniforms,
        };
        objectsToDraw.push(object);
        break;

      case 3:
        var object = {
          programInfo: meshProgramInfo,
          bufferInfo: coneBufferInfo,
          vertexArray: coneVAO,
          uniforms: element.uniforms,
        };
        objectsToDraw.push(object);
        break;

      case 4:
        var object = {
          programInfo: meshProgramInfo,
          bufferInfo: cylinderBufferInfo,
          vertexArray: cylinderVAO,
          uniforms: element.uniforms,
        };
        objectsToDraw.push(object);
        break;
    }
  } else {
    if (elementType === "Esfera") {
      var object = {
        programInfo: meshProgramInfo,
        bufferInfo: sphereBufferInfo,
        vertexArray: sphereVAO,
        uniforms: element.uniforms,
      };
      objectsToDraw.push(object);
    } else if (elementType === "Cubo") {
      var object = {
        programInfo: meshProgramInfo,
        bufferInfo: cubeBufferInfo,
        vertexArray: cubeVAO,
        uniforms: element.uniforms,
      };
      objectsToDraw.push(object);
    } else if (elementType === "Cilindro") {
      var object = {
        programInfo: meshProgramInfo,
        bufferInfo: cylinderBufferInfo,
        vertexArray: cylinderVAO,
        uniforms: element.uniforms,
      };
      objectsToDraw.push(object);
    } else {
      var object = {
        programInfo: meshProgramInfo,
        bufferInfo: coneBufferInfo,
        vertexArray: coneVAO,
        uniforms: element.uniforms,
      };
      objectsToDraw.push(object);
    }
  }
  createdElements++;
};


