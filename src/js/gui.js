var gui = new dat.GUI();
var cameraGui = new dat.GUI();
var animationGui = new dat.GUI();
var guiElements = [];

var config = {
  Aleatorio: () => {
    addElement();
    addGuiElement();
  },
  Esfera: () => {
    addElement("Esfera");
    addGuiElement();
  },
  Cubo: () => {
    addElement("Cubo");
    addGuiElement();
  },
  Cone: () => {
    addElement("Cone");
    addGuiElement();
  },
  Cilindro: () => {
    addElement("Cilindro");
    addGuiElement();
  },
  AddCamera: () => {
    config.SelectCameras.push(cameras.length);
    addCamera();
    createGuiCamera();
  },
  animation1: () => {
    firstAnimation();
  },
  animation2: () => {
    secondAnimation();
  },
  animation3: () => {
    thirdAnimation();
  },
  animationCamera1: () => {
    firstCameraAnimation();
  },
  animationCamera2: () => {
    secondCameraAnimation();
  },
  animationCamera3: () => {
    thirdCameraAnimation();
  },
  fps: 40,
  isAnimationActive: false,
  SelectCameras: [],
  SelectElements: [],
  elementGui: 1,
  elements: [],
  elementTarget: "none",
  index: 0,
  zoom: 120,
  fieldOfView: 60,
};

const loadGUI = () => {
  config.AddCamera();

  addElement();
  addElement();

  addGuiElement();
  //elements[1, 3, 'none']
  //index [0, 1, 2]
  //elementTarget 1 || 3 || 'none'
  config.elements = objects?.map((elem) => elem.position);
  createGuiCamera();
};

const loadAnimationGUI = () => {
  const animations = animationGui.addFolder("Animações Elemento");
  animations.add(config, "fps", 1, 60, 1).name("FPS");
  animations.add(config, "animation1").name("Animação 1");
  animations.add(config, "animation2").name("Animação 2");
  animations.add(config, "animation3").name("Animação 3");
  const animations2 = animationGui.addFolder("Animações Camera");
  animations2.add(config, "animationCamera1").name("Animação 1");
  animations2.add(config, "animationCamera2").name("Animação 2");
  animations2.add(config, "animationCamera3").name("Animação 3");
  animations.open();
  animations2.open();
}

const createGuiCamera = () => {
  if (cameraGui) {
    cameraGui.destroy();
  }
  cameraGui = new dat.GUI();

  cameraGui
    .add(config, "zoom", 0, 180, 1)
    .name("Zoom")
    .listen().onChange(() => (config.fieldOfView = 180 - config.zoom));

  cameraGui.add(config, "AddCamera").name("Adicionar Camera");
  cameraGui
    .add(config, "index", config.SelectCameras)
    .name("Câmera")
    .listen()
    .onChange(() => {
      activateCamera(parseInt(config.index));
      animationCameraType = []; //zera o vetor de animação, caso troque de câmera
      createGuiCamera(); //chama o guiCamera pra destruir e recriar a Gui
    }); 
  cameraGui
    .add(config, "elementTarget", config.elements.concat(["none"]))
    .name("Look At").listen().onChange(() => {
      cameras[config.index].translation.x = 0;
      cameras[config.index].translation.y = 0;
      createGuiCamera();
    });

  const newCameraGui = cameraGui.addFolder(`Câmera ${config.index}`);

  const camTranslation = newCameraGui.addFolder("Translação");
  camTranslation.add(cameras[config.index].translation, "x", -360, 360, 1);
  camTranslation.add(cameras[config.index].translation, "y", -360, 360, 1);
  camTranslation.add(cameras[config.index].translation, "z", -360, 360, 1);

  const camRotation = newCameraGui.addFolder("Rotação");
  camRotation.add(cameras[config.index].rotation, "x", -360, 360, 1);
  camRotation.add(cameras[config.index].rotation, "y", -360, 360, 1);
  camRotation.add(cameras[config.index].rotation, "z", -360, 360, 1);
};

const addGuiElement = () => {
  if (gui) {
    gui.destroy();
  }
  gui = new dat.GUI();
  const newElement = gui.addFolder("Adicionar Elemento");
  newElement.add(config, "Aleatorio");
  newElement.add(config, "Esfera");
  newElement.add(config, "Cubo");
  newElement.add(config, "Cone");
  newElement.add(config, "Cilindro");
  newElement.open();
  config.elements = objects?.map((elem) => elem.position);

  const objectIndex = config.elements.indexOf(parseInt(config.elementGui));

  gui.add(config, "elementGui", config.elements).name("Elemento")
    .onChange(() => {
      addGuiElement(true);
    });
  const element = gui.addFolder(objects[objectIndex]?.name);

  if (objectIndex >= 1) {
    element.add(objects[objectIndex], "Remover");
  }
  element.add(objects[objectIndex], "isOrbiting").name("Point rotation");
  
  element.add(objects[objectIndex], "Axys", ['x', 'y', 'z']).name("Select Axys");

  const elementRotation = element.addFolder("Rotação");
  elementRotation.add(objects[objectIndex].rotation, "x", -50, 500, 0.5);
  elementRotation.add(objects[objectIndex].rotation, "y", -50, 50, 0.5);
  elementRotation.add(objects[objectIndex].rotation, "z", -50, 50, 0.5);
  elementRotation.open();

  const elementTranslation = element.addFolder("Translação");
  elementTranslation.add(objects[objectIndex].translation, "x", -300, 300, 0.5);
  elementTranslation.add(objects[objectIndex].translation, "y", -300, 300, 0.5);
  elementTranslation.add(objects[objectIndex].translation, "z", -50, 50, 0.5);
  elementTranslation.open();

  const elementScale = element.addFolder("Escala");
  elementScale.add(objects[objectIndex].scale, "x", 0, 5, 0.5);
  elementScale.add(objects[objectIndex].scale, "y", 0, 5, 0.5);
  elementScale.add(objects[objectIndex].scale, "z", 0, 10, 0.5);
  elementScale.open();
  createGuiCamera();
};
