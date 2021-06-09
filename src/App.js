import React, {useState, useMemo } from 'react';
import './App.css';
import { ImageEditor } from './components/ImageEditor';
import ImageCropper from './components/ImageCropper/ImageCropper';
import ImageEasyCrop from './components/ImageEasyCrop/ImageEasyCrop';

const PACKAGE = {
  implemented: 0,
  cropperjs: 1,
  reactEasyCrop: 2,
};

const packages = [
  {name: 'implemented', id: PACKAGE.implemented},
  {name: 'cropperjs', id: PACKAGE.cropperjs},
  {name: 'react-easy-crop', id: PACKAGE.reactEasyCrop},
]

const src='https://miro.medium.com/max/5300/1*FNghpM3llxbk9SFi9ymPug.jpeg';

function App() {
  const [demoSelected, setDemoSelected] = useState(PACKAGE.cropperjs);

  const currentDemo = useMemo(() => {
    switch(demoSelected) {
      case PACKAGE.implemented:
        return <ImageEditor />;
      case PACKAGE.cropperjs:
        return <ImageCropper src={src} />;
      case PACKAGE.reactEasyCrop: 
        return <ImageEasyCrop src={src} />;
      default:
        return null;
    }
  }, [demoSelected]);

  const handleDemoChanged = (event) => {
    setDemoSelected(Number(event.target.value));
  }

  return (
    <div className="App">
      <select value={demoSelected} onChange={handleDemoChanged}>
        {packages.map((pack)=> (
          <option key={String(pack.id)} value={pack.id}>{pack.name}</option>
        ))}
      </select>
      {currentDemo}
    </div>
  );
}

export default App;
