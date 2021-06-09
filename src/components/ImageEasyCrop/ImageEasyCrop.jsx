import React, { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../util';
import './ImageEasyCrop.css';

const ImageEasyCrop = ({ src }) => {
  const [imageDestination, setImageDestination] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  }

  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
  }

  const showCroppedImage = useCallback(async (areaPixels) => {
    try {
      const croppedImage = await getCroppedImg(
        src,
        areaPixels,
        rotation
      )
      setImageDestination(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [rotation, src]);

  useEffect(() => {
    showCroppedImage(croppedAreaPixels);
  }, [croppedAreaPixels, showCroppedImage]);

  const handleCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {
    console.log(croppedArea, newCroppedAreaPixels);
    setCroppedAreaPixels(newCroppedAreaPixels);
  }, []);

  return (
    <div className="Image-easy-crop-demo-container">
      <div className="Image-easy-crop-container">
        <Cropper
          image={src}
          crop={crop}
          cropShape='round'
          aspect={1}
          onCropChange={handleCropChange}
          onCropComplete={handleCropComplete}
          zoom={zoom}
          rotation={rotation}
        />
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

        <img src={imageDestination} className="Image-easy-crop-preview" alt="Destination" />
      </div>
    </div>
  );
}

export default ImageEasyCrop;