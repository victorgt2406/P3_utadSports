import { generateRandomAvatar } from "./AvatarCopy";

const VsImage = ({ image1 = generateRandomAvatar(), image2 = generateRandomAvatar(), result = '0 - 0', isResult = false }) => {
  return (
    <div className="" style={{ display: 'flex', alignItems: 'center', fontSize: 25, color: '#ACACAC' }}>
      <img
        className="icono-izquierda me-3"
        src={image1}
        style={{ width: '50px', height: '50px', borderRadius: '40px' }}
      />
      {isResult ? (
        <span style={{ color: 'black' }}>{result}</span>
      ) : (
        <span>VS</span>
      )}
      <img
        className="icono-derecha ms-3"
        src={image2}
        style={{ width: '50px', height: '50px', borderRadius: '40px' }}
      />
    </div>
  );
};

export default VsImage;

