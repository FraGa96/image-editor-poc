import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './ImageCropper.css';

const ImageCropper = ({ src }) => {
  const [imageDestination, setImageDestination] = useState('');
  const [zoom, setZoom] = useState(0);
  const [rotation, setRotation] = useState(0);
  const imageElement = useRef();
  const cropper = useRef();

  useEffect(() => {
    if (!cropper.current) {
      console.log('hetre')
      cropper.current = new Cropper(imageElement.current, {
        zoomable: true,
        scalable: true,
        aspectRatio: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        guides: false,
        movable: true,
        crop: () => {
          console.log('pop');
          const canvas = cropper.current.getCroppedCanvas();
          setImageDestination(canvas.toDataURL('image/png'));
        }
      });
    }
  }, [imageElement]);

  useEffect(() => {
    if (cropper.current && cropper.current.canvasData) {
      cropper.current.reset();
      cropper.current.zoom(zoom/100);
      cropper.current.rotate(rotation);
    }
  }, [zoom, rotation]);

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  }

  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
  }

  return (
    <div>
      <div className="Image-cropper-container">
        <img ref={imageElement} src={src} alt="Source" crossOrigin="true" />
      </div>

      <div className="Image-easy-crop-options">
        <label>
          Zoom
          <input type='number' value={zoom} onChange={(e) => handleZoomChange(e.target.value)} />
        </label>

        <label>
          Rotation
          <input type='number' value={rotation} onChange={(e) => handleRotationChange(e.target.value)} />
        </label>

        <img src={imageDestination} className="Image-cropper-preview" alt="Destination" />
      </div>
    </div>
  );
}

export default ImageCropper;