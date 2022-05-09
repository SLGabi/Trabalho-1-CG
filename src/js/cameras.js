var cameras = [];

var createdCameras = 1;

var guiCameras = {
  index: 0,
};

const addCamera = () => {
  const camera = {
    name: `Camera ${createdCameras}`,
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    translation: {
      x: 0,
      y: 0,
      z: 360,
    },
    active: false,
  };
  createdCameras++;
  cameras.push(camera);
};

activateCamera = (index) => {
  cameras = cameras.map((camera, i) => { //operação sobre vetores, pegar uma câmera e testar se o índice da posição for igual ao index, aí o camera recebe true, senão false
    i === index ? (camera.active = true) : (camera.active = false);
    return camera;
  });

  cameras.forEach((camera,index) => {
    if(camera.active) {
      guiCameras.index = index;
    }
  })
};

