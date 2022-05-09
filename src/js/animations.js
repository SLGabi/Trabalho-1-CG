animationType = [];
animationCameraType = [];

const animation = (objects) => {
    objects.forEach((object) => {
        switch (animationType[0].movementType) {
            case 'translation':
                switch (animationType[0].axysType) {
                    case 'x':
                        object.translation.x += animationType[0].value;
                        break;
                    case 'y':
                        object.translation.y += animationType[0].value;
                        break;
                    case 'z':
                        object.translation.z += animationType[0].value;
                        break;
                }
                break;
            case 'rotation':
                switch (animationType[0].axysType) {
                    case 'x':
                        object.rotation.x += animationType[0].value;
                        break;
                    case 'y':
                        object.rotation.y += animationType[0].value;
                        break;
                    case 'z':
                        object.rotation.z += animationType[0].value;
                        break;
                }
                break;
            case 'default':
                break;
        }
    });
};

const animationCamera = () => {
    switch (animationCameraType[0].movementType) {
        case 'translation':
            switch (animationCameraType[0].axysType) {
                case 'x':
                    cameras[config.index].translation.x += animationCameraType[0].value;
                    break;
                case 'y':
                    cameras[config.index].translation.y += animationCameraType[0].value;
                    break;
                case 'z':
                    cameras[config.index].translation.z += animationCameraType[0].value;
                    break;
            }
            break;
        case 'rotation':
            switch (animationCameraType[0].axysType) {
                case 'x':
                    cameras[config.index].rotation.x += animationCameraType[0].value;
                    break;
                case 'y':
                    cameras[config.index].rotation.y += animationCameraType[0].value;
                    break;
                case 'z':
                    cameras[config.index].rotation.z += animationCameraType[0].value;
                    break;
            }
            break;

        case 'fielOfView':
            config.fieldOfView += animationCameraType[0].value;
        case 'default':
            break;
    }
};




const firstAnimation = () => { //triângulo de objetos
    for (let i = 0; i < 30; i++) {
        animationType.push({
            steps: 1,
            movementType: "translation",
            axysType: "x",
            value: 5,
        });
        animationType.push({
            steps: 1,
            movementType: "translation",
            axysType: "y",
            value: 5,
        });
    }
    for (let i = 0; i < 30; i++) {
        animationType.push({
            steps: 1,
            movementType: "translation",
            axysType: "x",
            value: 5,
        });
        animationType.push({
            steps: 1,
            movementType: "translation",
            axysType: "y",
            value: -5,
        });
    }
    for (let i = 0; i < 30; i++) {
        animationType.push({
            steps: 1,
            movementType: "translation",
            axysType: "x",
            value: -5,
        });
    }
}

const secondAnimation = () => {
    for (let i = 0; i < 50; i++) {
        animationType.push({ steps: 8, movementType: 'translation', axysType: 'y', value: 8 });
        animationType.push({ steps: 3, movementType: 'rotation', axysType: 'x', value: 3 });
        animationType.push({ steps: 3, movementType: 'translation', axysType: 'x', value: 3 });
        animationType.push({ steps: 8, movementType: 'translation', axysType: 'y', value: -8 });
    }
}

const thirdAnimation = () => {
    for (let i = 0; i < 50; i++) {
        animationType.push({ steps: 15, movementType: 'translation', axysType: 'z', value: 15 });
        animationType.push({ steps: 8, movementType: 'rotation', axysType: 'y', value: 8 });
        animationType.push({ steps: 15, movementType: 'translation', axysType: 'z', value: -15 });
    }
}

const firstCameraAnimation = () => {
    for (let i = 0; i < 20; i++) {
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'z', value: -15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'x', value: 15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'y', value: 15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'x', value: -15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'y', value: -15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'z', value: 15 });
    }
}

const secondCameraAnimation = () => {
    for (let i = 0; i < 20; i++) {
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'z', value: -15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'y', value: 15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'z', value: 15 });
        animationCameraType.push({ stepsCamera: 15, movementType: 'translation', axysType: 'y', value: -15 });
    }
}

const thirdCameraAnimation = () => {
    for (let i = 0; i < 20; i++) {
        animationCameraType.push({ stepsCamera: 10, movementType: 'fielOfView', value: 10 });
        animationCameraType.push({ stepsCamera: 30, movementType: 'rotation', axysType: 'z', value: -30 });
        animationCameraType.push({ stepsCamera: 30, movementType: 'rotation', axysType: 'z', value: 30 });
        animationCameraType.push({ stepsCamera: 10, movementType: 'fielOfView', value: -10 });
    }
}