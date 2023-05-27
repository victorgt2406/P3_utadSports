import { useContext } from "react";
import { CONTEXT } from "../../utils/Context";


type FechaProp = {
  fecha: string;
};

const FechaGrande = (props: FechaProp) => {
  const context = useContext(CONTEXT);

  const isSmallScreen = context.isMobile();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString(context.language, { month: 'short' });
    const dayStyle = { fontSize: 60, color: '#ACACAC' };
    const monthStyle = { fontSize: 25, color: '#ACACAC' };

    return (
      <div className='d-flex flex-column align-items-center'>
        <span style={{ ...dayStyle, borderTop: 'none' }}>{day}</span>
        <div className="">
          <span style={{ ...monthStyle, marginTop: '-8px' }}>{month}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: `${isSmallScreen ? '100%' : 'clamp(50px, 100px, 150px)'}` }}>
      <span className="align-items-end">{formatDate(props.fecha)}</span>
    </div>
  );
};

export default FechaGrande;
