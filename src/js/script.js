function main() {

  function computeMatrix(viewProjectionMatrix, translation, rotation, scale) {
    var matrix;
    matrix = m4.translate(
      viewProjectionMatrix,
      translation.x,
      translation.y,
      translation.z
    );
    matrix = m4.xRotate(matrix, rotation.x);
    matrix = m4.yRotate(matrix, rotation.y);
    matrix = m4.zRotate(matrix, rotation.z);
    matrix = m4.scale(matrix, scale.x, scale.y, scale.z);
    return matrix;
  }

  loadGUI();
  loadAnimationGUI();

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var fieldOfViewRadians = degToRad(config.fieldOfView);
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, 200];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    if (config.elementTarget !== "none") {
      const targetIndex = config.elements.indexOf(
        parseInt(config.elementTarget)
      );
      target = [
        objects[targetIndex].translation.x,
        objects[targetIndex].translation.y,
        objects[targetIndex].translation.z,
      ];
    }

    var cameraLookAt = m4.lookAt(cameraPosition, target, up);
    const camRotationX = m4.xRotation(
      degToRad(cameras[guiCameras.index].rotation.x)
    );
    const camRotationY = m4.yRotation(
      degToRad(cameras[guiCameras.index].rotation.y)
    );
    const camRotationZ = m4.zRotation(
      degToRad(cameras[guiCameras.index].rotation.z)
    );
    cameraMatrix = m4.multiply(
      cameraLookAt,
      m4.multiply(camRotationX, m4.multiply(camRotationY, camRotationZ))
    );
    cameraMatrix = m4.translate(
      cameraMatrix,
      cameras[guiCameras.index].translation.x,
      cameras[guiCameras.index].translation.y,
      cameras[guiCameras.index].translation.z
    );

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);


    objects.forEach((object) => {
      if (object.isOrbiting) {
        switch(object.Axys) {
          case 'x':
            object = orbitObjectX(1, object);
            break;
          case 'y':
            object = orbitObjectY(1, object);
            break;
          case 'z':
            object = orbitObjectsZ(1, object);
            break;
        }
      }
      object.uniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        object.translation,
        object.rotation,
        object.scale
      );
    });

    objectsToDraw.forEach(function (object) {
      const programInfo = object.programInfo;
      gl.useProgram(programInfo.program);
      // Setup all the needed attributes.
      gl.bindVertexArray(object.vertexArray);
      // Set the uniforms we just computed
      twgl.setUniforms(programInfo, object.uniforms);
      twgl.drawBufferInfo(gl, object.bufferInfo);
    });

    if (animationType.length || animationCameraType.length) {
      if (animationType.length) {
        if (animationType[0].steps > 0) {
          setTimeout(() => {
            requestAnimationFrame(render);
            animationType[0].steps--;
            animation(objects);
          }, 1000 / config.fps);
        }
        else {
          animationType.shift(); //removendo pra ir pra próxima
          requestAnimationFrame(render);
        }
      }
      else {
        if (animationCameraType[0].stepsCamera > 0) {
          setTimeout(() => {
            requestAnimationFrame(render);
            animationCameraType[0].stepsCamera--;
            animationCamera(cameras);
          }, 1000 / config.fps);
        }
        else {
          animationCameraType.shift();
          requestAnimationFrame(render);
        }
      }
    } else {
      requestAnimationFrame(render);
    }
  }

  requestAnimationFrame(render);
}

main();
